/* eslint-disable indent */
/* eslint-disable no-unused-vars */

import {PoolClient, Pool} from 'pg'
import {pool} from '../loaders/database'
import {IModel} from '../models/IModel'

interface IJoin<T> {
  model: T
  local: string
  foreign: string
}

export interface IBaseRepository<T extends IModel> {
  insert<Q extends T>(
    model: Q,
    withID?: boolean,
    client?: Pool | PoolClient,
  ): Promise<Q | false>

  update<Q extends T>(id: number, model: Q): Promise<T | false>

  insertMany<Q extends T>(models: Q[], withID?: boolean): Promise<boolean>

  findById<Q extends T>(id: number): Promise<Q | null>

  findAll(limit?: number, offset?: number): Promise<T[]>

  deleteById(id: number): Promise<T | false>

  find<Q extends T>(
    filter: Partial<Q>,
    or?: boolean,
    ignoreCase?: boolean,
  ): Promise<T[]>

  findOne<Q extends T>(
    filter: Partial<Q>,
    or?: boolean,
    ignoreCase?: boolean,
  ): Promise<Q | null>

  upsert<Q extends T>(model: Q, filter?: Partial<Q>): Promise<Q | false>

  findWildCard(
    filter: Record<string, string | number>,
    or?: boolean,
  ): Promise<T[]>

  executeRawQuery<Q>(query: string, params?: (string | number)[]): Promise<Q[]>
}

export abstract class BaseRepository<T extends IModel>
  implements IBaseRepository<T>
{
  protected pool: Pool
  protected tableName: string
  protected columns: string[]
  protected ignore: string[]
  protected idColumn: string
  protected hasA: IJoin<T>[]

  constructor({
    tableName,
    columns,
    idColumn,
    hasA,
    ignore,
  }: {
    idColumn?: string
    tableName: string
    columns: string[]
    hasA?: IJoin<T>[]
    ignore?: string[]
  }) {
    this.pool = pool
    this.idColumn = idColumn || tableName.replace(/(es|s)$/, '_id')
    this.columns = [...columns, 'created_at', 'updated_at']
    this.tableName = tableName
    this.hasA = hasA || []
    this.ignore = ignore || []
  }

  public async insert<Q extends T>(
    model: Q,
    id?: boolean,
    client?: Pool | PoolClient,
  ): Promise<Q | false> {
    const {columns, placeholders, values} = this.generateInsertQueryParts(
      model,
      id,
    )

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`

    const {rowCount, rows} = await (client || this.pool).query<Q>(query, values)

    return rowCount ? rows[0] : false
  }

  public async update<Q extends T>(
    id: number,
    model: Partial<Q>,
  ): Promise<Q | false> {
    const item = await this.findById<Q>(id)

    if (item) {
      const {columns, values} = this.generateUpdateQueryParts(model)
      const query = `UPDATE ${this.tableName} SET (${columns}) WHERE ${
        this.idColumn
      } = $${values.length + 1} RETURNING *`

      const {rowCount, rows} = await this.pool.query<Q>(query, [...values, id])

      if (rowCount) return rows[0]
    }

    return false
  }

  public async upsert<Q extends T>(
    model: Q,
    filter?: Partial<Q>,
  ): Promise<Q | false> {
    const item = filter
      ? await this.findOne(filter)
      : await this.findById(model[this.idColumn])

    if (item) {
      const update = await this.update<Q>(model[this.idColumn], model)
      return update
    }

    const insert = await this.insert(model)
    return insert
  }

  // insertMany<Q = T>(models: Q[], withID?: boolean): Promise<boolean>
  public async insertMany<Q extends T>(
    models: Q[],
    withID?: boolean,
  ): Promise<boolean> {
    const client = await pool.connect()
    try {
      client.query('BEGIN')

      // eslint-disable-next-line no-restricted-syntax
      for await (const model of models) {
        const result = await this.insert(model, withID, client)

        if (!result)
          throw new Error(`failed to insert: ${JSON.stringify(model)}`)
      }

      await client.query('COMMIT')
      return true
    } catch (e) {
      console.log(e)
      await client.query('ROLLBACK')
      return false
    } finally {
      client.release()
    }
  }

  public async findById<Q extends T>(id: number): Promise<Q | null> {
    const columns = this.getColumns()
    const {rowCount, rows} = await this.pool.query<Q>(
      `SELECT ${columns} FROM ${this.tableName} WHERE ${this.idColumn} = $1`,
      [id],
    )

    if (rowCount) return rows[0]

    return null
  }

  // eslint-disable-next-line class-methods-use-this
  private getLimitOffset(limit?: number, offset?: number): string {
    if (limit && typeof offset === 'number') {
      return `LIMIT ${limit} OFFSET ${offset}`
    }

    if (limit) {
      return `LIMIT ${limit} OFFSET 0`
    }

    if (offset) {
      return `LIMIT 100 OFFSET ${offset}`
    }

    return ''
  }

  public async findAll(limit?: number, offset?: number): Promise<T[]> {
    const columns = this.getColumns()
    const limitOffset = this.getLimitOffset(limit, offset)

    const {rows} = await this.pool.query<T>(
      `SELECT ${columns} FROM ${this.tableName} ORDER BY ${this.idColumn} ${limitOffset}`,
    )

    return rows
  }

  public async deleteById(id: number): Promise<T | false> {
    const {rowCount, rows} = await this.pool.query<T>(
      `DELETE FROM ${this.tableName} WHERE $1 RETURNING *`,
      [id],
    )

    return rowCount ? rows[0] : false
  }

  public async find<Q = T>(
    filter: Partial<Q>,
    or?: boolean,
    ignoreCase?: boolean,
  ): Promise<Q[]> {
    const columns = this.getColumns()

    const {query, values} = BaseRepository.generateSearchQueryParts<Q>(
      filter,
      false,
      or,
      ignoreCase,
    )

    const {rows} = await this.pool.query<Q>(
      `SELECT ${columns} FROM ${this.tableName} WHERE ${query}`,
      values,
    )

    return rows
  }

  public async findOne<Q = T>(
    filter: Partial<Q>,
    or?: boolean,
    ignoreCase?: boolean,
  ): Promise<Q | null> {
    const rows = await this.find(filter, or, ignoreCase)

    return rows.length ? rows[0] : null
  }

  public async executeRawQuery<Q = unknown>(
    query: string,
    params?: (string | number)[],
  ): Promise<Q[]> {
    const {rows} = await this.pool.query<Q>(query, params)

    return rows
  }

  public async findWildCard(
    filter: Record<string, string | number>,
    or?: boolean,
  ): Promise<T[]> {
    const columns = this.getColumns()

    const {query, values} = BaseRepository.generateSearchQueryParts(
      filter,
      true,
      or,
    )

    const {rows} = await this.pool.query<T>(
      `SELECT ${columns} FROM ${this.tableName} WHERE ${query}`,
      values,
    )

    return rows
  }

  private generateInsertQueryParts(model: Partial<T>, withID?: boolean) {
    const cols = this.columns.filter(
      col =>
        !(
          col === this.idColumn ||
          /ated_at$/g.test(col) ||
          // eslint-disable-next-line no-bitwise
          ~this.ignore.indexOf(col)
        ),
    ) // remove id column and date guys

    const columns = withID ? [this.idColumn, ...cols] : cols
    return columns.reduce(
      (acc, col, index) => {
        // eslint-disable-next-line no-param-reassign
        acc.columns += index === columns.length - 1 ? `${col}` : `${col}, `

        const param = index + 1
        // eslint-disable-next-line no-param-reassign
        acc.placeholders +=
          index === columns.length - 1 ? `$${param}` : `$${param}, `

        // eslint-disable-next-line no-param-reassign
        acc.values.push(model[col])

        return acc
      },
      {columns: '', placeholders: '', values: []},
    )
  }

  private generateUpdateQueryParts(model: Partial<T>) {
    const cols = Object.keys(model).filter(
      col =>
        !(
          col === this.idColumn ||
          /ated_at$/g.test(col) ||
          // eslint-disable-next-line no-bitwise
          ~this.ignore.indexOf(col)
        ),
    ) // remove id column and date guys
    return cols.reduce(
      (acc, col, index) => {
        const param = index + 1
        // eslint-disable-next-line no-param-reassign
        acc.columns +=
          index === cols.length - 1
            ? `${col} = $${param}`
            : `${col} = $${param}, `

        acc.values.push(model[col])

        return acc
      },
      {columns: '', values: []},
    )
  }

  private static generateSearchQueryParts<T>(
    model: Partial<T>,
    wildcard?: boolean,
    or?: boolean,
    ignoreCase?: boolean,
  ) {
    return Object.keys(model).reduce(
      (acc, col, index, arr) => {
        const param = index + 1
        const operator = wildcard ? 'LIKE' : '='
        const glue = or ? 'OR' : 'AND'
        const column = ignoreCase ? `LOWER(${col})` : col
        // eslint-disable-next-line no-param-reassign
        acc.query +=
          index === arr.length - 1
            ? `${column} ${operator} $${param}`
            : `${column} ${operator} $${param} ${glue} `

        const value = wildcard ? `%${model[col]}%` : model[col]
        // eslint-disable-next-line no-param-reassign
        acc.values.push(ignoreCase ? String(value).toLowerCase() : value)

        return acc
      },
      {query: '', values: []},
    )
  }

  private getColumns(): string {
    const columns = [this.idColumn, ...this.columns]
      // eslint-disable-next-line no-bitwise
      .filter(col => !~this.ignore.indexOf(col))
    return columns.reduce((acc, col, index) => {
      // eslint-disable-next-line no-param-reassign
      acc +=
        index === columns.length - 1
          ? `${this.tableName}.${col}`
          : `${this.tableName}.${col}, `

      return acc
    }, '')
  }
}
