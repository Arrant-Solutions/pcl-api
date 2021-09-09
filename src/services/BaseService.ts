import {IBaseRepository} from '../repositories/BaseRepository'
import {IResponse} from '../types'

abstract class BaseService<T> {
  private repository: IBaseRepository<T>

  constructor(repository: IBaseRepository<T>) {
    this.repository = repository
  }

  public async insert(model: T): Promise<IResponse<T | false>> {
    try {
      const result = await this.repository.insert(model)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to upload'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
  public async update(id: number, model: T): Promise<IResponse<T | false>> {
    try {
      const result = await this.repository.update(id, model)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to upload'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
  public async insertMany(models: T[]): Promise<IResponse<boolean>> {
    try {
      const result = await this.repository.insertMany(models)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to upload'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
  public async findById(id: number): Promise<IResponse<T | null>> {
    try {
      const result = await this.repository.findById(id)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to fetch with specified id'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
  public async findAll(offset?: number): Promise<IResponse<T[]>> {
    try {
      const result = await this.repository.findAll(offset)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to fetch content'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
  public async findOne(filter: Partial<T>): Promise<IResponse<T>> {
    try {
      const result = await this.repository.findOne(filter)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to fetch content'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
  public async deleteById(id: number): Promise<IResponse<T | false>> {
    try {
      const result = await this.repository.deleteById(id)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to delete'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
  public async find(filter: Partial<T>): Promise<IResponse<T[]>> {
    try {
      const result = await this.repository.find(filter)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to fetch items'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
  public async findWildCard(
    filter: Record<string, string | number>,
  ): Promise<IResponse<T[]>> {
    try {
      const result = await this.repository.findWildCard(filter)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to delete'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
}

export default BaseService
