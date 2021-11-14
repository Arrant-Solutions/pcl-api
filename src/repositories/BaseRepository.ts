/* eslint-disable indent */
/* eslint-disable no-unused-vars */

import {validate} from 'class-validator'
import pgPromise = require('pg-promise')
// import {PoolClient, Pool} from 'pg'
import {db} from '../loaders/database'
import {ICreate, IModel} from '../models/IModel'

interface IJoin<T> {
  model: T
  local: string
  foreign: string
}

export interface IBaseRepository<T extends IModel, C extends ICreate<unknown>> {
  insert<Q extends T>(model: Q, withID?: boolean): Promise<Q | false | string[]>

  setTask(tx: pgPromise.ITask<T>)

  update<Q extends T>(
    id: number,
    model: Q,
    user_id?: number,
  ): Promise<T | false | string[]>

  insertMany<Q extends T>(models: Q[], withID?: boolean): Promise<boolean>

  findById<Q extends T>(id: number): Promise<Q | null>

  findAll(limit?: number, offset?: number): Promise<T[]>

  deleteById(id: number): Promise<T | false>

  delete<Q extends T>(
    filter: Partial<Q>,
    or?: boolean,
    ignoreCase?: boolean,
  ): Promise<Q | false>

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

  upsert<Q extends T>(
    model: Q,
    filter?: Partial<Q>,
  ): Promise<Q | false | string[]>

  findWildCard(
    filter: Record<string, string | number>,
    or?: boolean,
  ): Promise<T[]>

  executeRawQuery<Q>(query: string, params?: (string | number)[]): Promise<Q[]>
}

export abstract class BaseRepository<
  T extends IModel,
  C extends ICreate<unknown>,
> implements IBaseRepository<T, C>
{
  protected tx: pgPromise.ITask<T>
  protected tableName: string
  protected columns: string[]
  protected ignore: string[]
  protected idColumn: string
  protected hasA: IJoin<T>[]
  protected viewName: string
  protected model: C

  constructor({
    tableName,
    viewName,
    columns,
    idColumn,
    hasA,
    ignore,
  }: {
    idColumn?: string
    tableName: string
    viewName?: string
    columns: string[]
    hasA?: IJoin<T>[]
    ignore?: string[]
  }) {
    // this.pool = pool
    this.tx = undefined
    this.idColumn = idColumn || tableName.replace(/(es|s)$/, '_id')
    this.columns = [...columns, 'created_at', 'updated_at']
    this.tableName = tableName
    this.hasA = hasA || []
    this.ignore = ignore || []
    this.viewName = viewName
  }

  // setPool(client: PoolClient) {
  //   this.pool = client
  // }

  // async createTransactionClient(): Promise<PoolClient | void> {
  //   const client = await this.pool.connect()

  //   return client
  // }

  setTask(tx: pgPromise.ITask<T>) {
    this.tx = tx
  }

  public async insert<Q extends T>(
    model: Q,
    id?: boolean,
    // client?: Pool | PoolClient,
  ): Promise<Q | false | string[]> {
    this.model.assign = model

    const errors = await validate(this.model)

    if (errors.length > 0) {
      const errs = errors.reduce(
        (result, error) => [...result, ...Object.values(error.constraints)],
        [] as string[],
      )

      return errs
    }

    const {columns, placeholders, values} = this.generateInsertQueryParts(
      model,
      id,
    )

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`

    // console.log(JSON.stringify({query, values}, null, 2))

    // const { rowCount, rows } = await (client || this.pool).query<Q>(query, values)

    // return rowCount ? rows[0] : false

    const result = this.tx
      ? await this.tx.one(query, values)
      : await db.one<Q>(query, values)

    return result
  }

  public async update<Q extends T>(
    id: number,
    model: Partial<Q>,
    user_id?: number,
  ): Promise<Q | false | string[]> {
    const arg = {[this.idColumn as keyof Q]: id, user_id}
    const item = await (user_id
      ? this.findOne<Q>(arg as any)
      : this.findById(id))

    this.model.assign = {...item, ...model}

    const errors = await validate(this.model)

    if (errors.length > 0) {
      const errs = errors.reduce(
        (result, error) => [...result, ...Object.values(error.constraints)],
        [] as string[],
      )

      return errs
    }

    if (item) {
      const {columns, values} = this.generateUpdateQueryParts(model)
      const query =
        `UPDATE ${this.tableName} SET (${columns}) WHERE ` +
        `${this.idColumn} = $${values.length + 1} RETURNING *`

      // const {rowCount, rows} = await this.pool.query<Q>(query, [...values, id])

      // if (rowCount) return rows[0]

      const result = this.tx
        ? await this.tx.one(query, [...values, id])
        : await db.one<Q>(query, [...values, id])

      return result
    }

    return false
  }

  public async upsert<Q extends T>(
    model: Q,
    filter?: Partial<Q>,
  ): Promise<Q | false | string[]> {
    const item = filter
      ? await this.findOne(filter)
      : await this.findById(model[this.idColumn])

    this.model.assign = item ? {...item, ...model} : model

    const errors = await validate(this.model)

    if (errors.length > 0) {
      const errs = errors.reduce(
        (result, error) => [...result, ...Object.values(error.constraints)],
        [] as string[],
      )

      return errs
    }

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
    const result = await db.tx(async t => {
      // eslint-disable-next-line no-restricted-syntax
      for await (const model of models) {
        const response = await this.insert(model, withID)

        if (!response) {
          throw new Error(`failed to insert: ${JSON.stringify(model)}`)
        }

        if (
          typeof response === 'object' &&
          Array.isArray((response as any).errors)
        ) {
          const errors = (response as any).errors as string[]
          throw new Error(
            errors.length > 0
              ? errors[0]
              : `Failed to insert: ${JSON.stringify(model)}`,
          )
        }
      }

      return true
    })

    return result

    // const client = await pool.connect()
    // try {
    //   client.query('BEGIN')

    //   // eslint-disable-next-line no-restricted-syntax
    //   for await (const model of models) {
    //     const result = await this.insert(model, withID, client)

    //     if (
    //       !result ||
    //       (typeof result === 'object' && Array.isArray((result as any).errors))
    //     )
    //       throw new Error(`failed to insert: ${JSON.stringify(model)}`)
    //   }

    //   await client.query('COMMIT')
    //   return true
    // } catch (e) {
    //   // console.log(e)
    //   await client.query('ROLLBACK')
    //   return false
    // } finally {
    //   client.release()
    // }
  }

  public async findById<Q extends T>(id: number): Promise<Q | null> {
    const columns = this.getColumns()

    const result = await db.one<Q>(
      `SELECT ${columns} FROM ${this.tableName} WHERE ${this.idColumn} = $1`,
      [id],
    )

    // const {rowCount, rows} = await this.pool.query<Q>(
    //   `SELECT ${columns} FROM ${this.tableName} WHERE ${this.idColumn} = $1`,
    //   [id],
    // )

    // if (rowCount) return rows[0]

    return result
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

    const result = await db.many<T>(
      `SELECT ${columns} FROM ${this.viewName || this.tableName} ORDER BY ` +
        `${this.idColumn} ${limitOffset}`,
    )

    // const {rows} = await this.pool.query<T>(
    //   `SELECT ${columns} FROM ${this.viewName || this.tableName} ORDER BY ${
    //     this.idColumn
    //   } ${limitOffset}`,
    // )

    return result
  }

  public async deleteById(id: number): Promise<T | false> {
    const {rowCount, rows} = await db.result(
      `DELETE FROM ${this.tableName} WHERE $1 RETURNING *`,
      [id],
    )

    return rowCount ? rows[0] : false

    // const {rowCount, rows} = await this.pool.query<T>(
    //   `DELETE FROM ${this.tableName} WHERE $1 RETURNING *`,
    //   [id],
    // )

    // return rowCount ? rows[0] : false
  }

  public async delete<Q = T>(
    filter: Partial<Q>,
    or?: boolean,
    ignoreCase?: boolean,
  ): Promise<Q | false> {
    const {query, values} = BaseRepository.generateSearchQueryParts<Q>(
      filter,
      false,
      or,
      ignoreCase,
    )

    const {rowCount, rows} = await db.result(
      `DELETE FROM ${this.tableName} WHERE ${query} RETURNING *`,
      values,
    )

    return rowCount ? rows[0] : false

    // const {rowCount, rows} = await this.pool.query<Q>(
    //   `DELETE FROM ${this.tableName} WHERE ${query} RETURNING *`,
    //   values,
    // )

    // return rowCount ? rows[0] : false
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

    const result = await db.many<Q>(
      `SELECT ${columns} FROM ` +
        `${this.viewName || this.tableName} WHERE ${query}`,
      values,
    )

    return result

    // const {rows} = await this.pool.query<Q>(
    //   `SELECT ${columns} FROM ${
    //     this.viewName || this.tableName
    //   } WHERE ${query}`,
    //   values,
    // )

    // return rows
  }

  public async findOne<Q = T>(
    filter: Partial<Q>,
    or?: boolean,
    ignoreCase?: boolean,
  ): Promise<Q | null> {
    const rows = await this.find(filter, or, ignoreCase)

    return rows.length ? rows[0] : null
  }

  // eslint-disable-next-line class-methods-use-this
  public async executeRawQuery<Q = unknown>(
    query: string,
    params?: (string | number)[],
  ): Promise<Q[]> {
    const {rows} = this.tx
      ? await this.tx.result(query, params)
      : await db.result(query, params)

    // const {rows} = await this.pool.query<Q>(query, params)

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

    const {rows} = await db.result(
      `SELECT ${columns} FROM ` +
        `${this.viewName || this.tableName} WHERE ${query}`,
      values,
    )

    // const {rows} = await this.pool.query<T>(
    //   `SELECT ${columns} FROM ${
    //     this.viewName || this.tableName
    //   } WHERE ${query}`,
    //   values,
    // )

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
        const column =
          ignoreCase && typeof model[col] !== 'number' ? `LOWER(${col})` : col
        // console.log(model[col], col, typeof model[col])
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
      .filter(col => !!this.viewName || !~this.ignore.indexOf(col))
    return columns.reduce((acc, col, index) => {
      // eslint-disable-next-line no-param-reassign
      acc +=
        index === columns.length - 1
          ? `${this.viewName || this.tableName}.${col}`
          : `${this.viewName || this.tableName}.${col}, `

      return acc
    }, '')
  }
}
