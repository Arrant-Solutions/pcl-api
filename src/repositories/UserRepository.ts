import {IUser} from '../models/user'
import {BaseRepository, RepositoryI} from './BaseRepository'

class UserRepository extends BaseRepository<IUser> implements RepositoryI {
  public insert(model: T): Promise<boolean> {
    return this.pool.query("INSERT INTO")
  }

  public abstract insertMany(models: T[]): boolean

  public abstract findById(id: number): T

  public abstract findAll(): T[]

  public abstract deleteById(id: number): boolean

  public abstract find(filter: Record<string, string | number>): T[]
}
