/* eslint-disable indent */
/* eslint-disable no-unused-vars */

import {PoolClient, Pool} from 'pg'
import {pool} from '../loaders/database'
import {IModel} from '../models/IModel'
import {Optional} from '../types'

interface IJoin<T> {
  model: T
  local: string
  foreign: string
}

export interface IBaseRepository<T extends IModel> {
  insert<Q = T>(
    model: Q,
    withID?: boolean,
    client?: Pool | PoolClient,
  ): Promise<Q | false>

  update(id: number, model: T): Promise<T | false>

  insertMany(
    models: Optional<T, 'created_at' | 'updated_at'>[],
    withID?: boolean,
  ): Promise<boolean>

  findById(id: number): Promise<T | null>

  findAll(offset?: number): Promise<T[]>

  deleteById(id: number): Promise<T | false>

  find(filter: Partial<T>): Promise<T[]>

  findOne(filter: Partial<T>): Promise<T | null>

  findWildCard(filter: Record<string, string | number>): Promise<T[]>
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

  public async insert<Q = T>(
    model: Q,
    id?: boolean,
    client?: Pool | PoolClient,
  ): Promise<Q | false> {
    const {columns, placeholders, values} = this.generateInsertQueryParts(
      model,
      id,
    )

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`
    console.log(query)
    console.log(values)

    const {rowCount, rows} = await (client || this.pool).query<Q>(query, values)

    return rowCount ? rows[0] : false
  }

  public async update(id: number, model: Partial<T>): Promise<T | false> {
    const item = await this.findById(id)

    if (item) {
      const {columns, values} = this.generateUpdateQueryParts(model)
      const query = `UPDATE ${this.tableName} SET (${columns}) WHERE ${
        this.idColumn
      } = $${values.length + 1} RETURNING *`

      const {rowCount, rows} = await this.pool.query<T>(query, [...values, id])

      if (rowCount) return rows[0]
    }

    return false
  }

  public async insertMany(models: T[], withID?: boolean): Promise<boolean> {
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

  public async findById(id: number): Promise<T | null> {
    const columns = this.getColumns()
    const {rowCount, rows} = await this.pool.query<T>(
      `SELECT ${columns} FROM ${this.tableName} WHERE ${this.idColumn} = $1`,
      [id],
    )

    if (rowCount) return rows[0]

    return null
  }

  public async findAll(offset?: number): Promise<T[]> {
    const columns = this.getColumns()

    const {rows} = await this.pool.query<T>(
      `SELECT ${columns} FROM ${this.tableName} ORDER BY ${
        this.idColumn
      } LIMIT 100 OFFSET ${offset || 0}`,
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

  public async find(filter: Partial<T>): Promise<T[]> {
    const columns = this.getColumns()

    const {query, values} = BaseRepository.generateSearchQueryParts<T>(filter)

    const {rows} = await this.pool.query<T>(
      `SELECT ${columns} FROM ${this.tableName} WHERE ${query}`,
      values,
    )

    return rows
  }

  public async findOne(filter: Partial<T>): Promise<T | null> {
    const rows = await this.find(filter)

    return rows.length ? rows[0] : null
  }

  public async executeRawQuery<Q = unknown>(query: string): Promise<Q[]> {
    const {rows} = await this.pool.query<Q>(query)

    return rows
  }

  public async findWildCard(
    filter: Record<string, string | number>,
  ): Promise<T[]> {
    const columns = this.getColumns()

    const {query, values} = BaseRepository.generateSearchQueryParts(
      filter,
      true,
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
  ) {
    return Object.keys(model).reduce(
      (acc, col, index, arr) => {
        const param = index + 1
        const operator = wildcard ? 'LIKE' : '='
        // eslint-disable-next-line no-param-reassign
        acc.query +=
          index === arr.length - 1
            ? `${col} ${operator} $${param}`
            : `${col} ${operator} $${param} AND `

        const value = wildcard ? `%${model[col]}%` : model[col]
        // eslint-disable-next-line no-param-reassign
        acc.values.push(value)

        return acc
      },
      {query: '', values: []},
    )
  }

  private getColumns(): string {
    return this.columns.reduce((acc, col, index) => {
      // eslint-disable-next-line no-param-reassign
      acc +=
        index === this.columns.length - 1
          ? `${this.tableName}.${col}`
          : `${this.tableName}.${col}, `

      return acc
    }, '')
  }
}
