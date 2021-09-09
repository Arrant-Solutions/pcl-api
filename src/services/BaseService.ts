import {IBaseRepository} from '../repositories/BaseRepository'

abstract class BaseService<T> {
  private repository: IBaseRepository<T>

  constructor(repository: IBaseRepository<T>) {
    this.repository = repository
  }

  insert(model: T): Promise<T | false> {
    return this.repository.insert(model)
  }
  update(id: number, model: T): Promise<T | false> {
    return this.repository.update(id, model)
  }
  insertMany(models: T[]): Promise<boolean> {
    return this.repository.insertMany(models)
  }
  findById(id: number): Promise<T | null> {
    return this.repository.findById(id)
  }
  findAll(offset?: number): Promise<T[]> {
    return this.findAll(offset)
  }
  findOne(filter: Partial<T>): Promise<T> {
    return this.findOne(filter)
  }
  deleteById(id: number): Promise<T | false> {
    return this.deleteById(id)
  }
  find(filter: Partial<T>): Promise<T[]> {
    return this.repository.find(filter)
  }
  findWildCard(filter: Record<string, string | number>): Promise<T[]> {
    return this.repository.findWildCard(filter)
  }
}

export default BaseService
