/* eslint-disable no-unused-vars */

import {Pool, QueryResult} from 'pg'
import {pool} from '../loaders/database'

export interface RepositoryI<T = unknown> {
  insert(model: T): Promise<QueryResult<T>>

  update(id: number, model: T): Promise<T | false>

  insertMany(models: T[]): Promise<boolean>

  findById(id: number): Promise<T | null>

  findAll(): Promise<T[]>

  deleteById(id: number): Promise<boolean>

  find(filter: Record<string, string | number>): Promise<T[]>
}

export abstract class BaseRepository<T = unknown> implements RepositoryI<T> {
  protected pool: Pool
  protected tableName: string
  protected columns: string[]
  protected idColumn: string

  constructor({
    tableName,
    columns,
    idColumn,
  }: {
    idColumn?: string
    tableName: string
    columns: string[]
  }) {
    this.pool = pool
    this.idColumn = idColumn || 'id'
    this.columns = columns
    this.tableName = tableName
  }

  public insert(model: T): Promise<QueryResult<T>> {
    const {columns, placeholders, values} = this.generateInsertQueryParts(model)

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`

    return this.pool.query(query, values)
  }

  public async update(id: number, model: Partial<T>): Promise<T | false> {
    const item = await this.findById(id)

    if (item) {
      const {columns, values} = this.generateUpdateQueryParts(model)
      const query = `UPDATE ${this.tableName} SET (${columns}) WHERE ${
        this.idColumn
      } = $${values.length + 1} RETURNING *`

      const {rows} = await this.pool.query<T>(query, [...values, id])

      if (rows.length) return rows[0]
    }

    return false
  }

  public abstract insertMany(models: T[]): Promise<boolean>

  public async findById(id: number): Promise<T | null> {
    const columns = this.getColumns()
    const {rows} = await this.pool.query<T>(
      `SELECT ${columns} FROM ${this.tableName} WHERE ${this.idColumn} = ?`,
      [id],
    )

    if (rows.length) return rows[0]

    return null
  }

  public abstract findAll(): Promise<T[]>

  public abstract deleteById(id: number): Promise<boolean>

  public abstract find(filter: Record<string, string | number>): Promise<T[]>

  private generateInsertQueryParts(model: Partial<T>) {
    const cols = this.columns.filter(
      col => col !== this.idColumn || !/atedAt$/g.test(col),
    ) // remove id column and date guys
    return cols.reduce(
      (acc, col, index) => {
        // eslint-disable-next-line no-param-reassign
        acc.columns += index === cols.length - 1 ? `\`${col}\`` : `\`${col}\`, `

        const param = index + 1
        // eslint-disable-next-line no-param-reassign
        acc.placeholders +=
          index === cols.length - 1 ? `$${param}` : `$${param}, `

        // eslint-disable-next-line no-param-reassign
        acc.values.push(model[col])

        return acc
      },
      {columns: '', placeholders: '', values: []},
    )
  }

  private generateUpdateQueryParts(model: Partial<T>) {
    const cols = Object.keys(model).filter(
      col => col !== this.idColumn || !/atedAt$/g.test(col),
    ) // remove id column and date guys
    return cols.reduce(
      (acc, col, index) => {
        const param = index + 1
        // eslint-disable-next-line no-param-reassign
        acc.columns +=
          index === cols.length - 1
            ? `\`${col}\` = $${param}`
            : `\`${col}\` = $${param}, `

        acc.values.push(model[col])

        return acc
      },
      {columns: '', values: []},
    )
  }

  private getColumns(): string {
    return this.columns.reduce((acc, col, index) => {
      // eslint-disable-next-line no-param-reassign
      acc += index === this.columns.length - 1 ? `\`${col}\`` : `\`${col}\`, `

      return acc
    }, '')
  }
}
