/* eslint-disable no-unused-vars */

import {Pool} from 'pg'
import {pool} from '../loaders/database'

export interface RepositoryI<T = unknown> {
  insert(model: T): boolean

  insertMany(models: T[]): boolean

  findById(id: number): T

  findAll(): T[]

  deleteById(id: number): boolean

  find(filter: Record<string, string | number>): T[]
}

export abstract class BaseRepository<T = unknown> implements RepositoryI<T> {
  protected pool: Pool

  constructor() {
    this.pool = pool
  }

  public abstract insert(model: T): boolean

  public abstract insertMany(models: T[]): boolean

  public abstract findById(id: number): T

  public abstract findAll(): T[]

  public abstract deleteById(id: number): boolean

  public abstract find(filter: Record<string, string | number>): T[]
}
