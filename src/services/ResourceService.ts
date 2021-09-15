import {IResource, IResourceCreate} from '../models/Resource'
import {IResponse} from '../types'
import BaseService from './BaseService'

export default class ResourceService extends BaseService<
  IResource,
  IResourceCreate
> {
  public async insert<Q = Partial<IResource>>(
    model: Q & IResourceCreate,
    withID?: boolean,
  ): Promise<IResponse<IResourceCreate | false>> {
    try {
      const result = await this.repository.insert<IResourceCreate>(
        model,
        withID,
      )

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to upload'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }

  public async insertMany<Q = Partial<IResource>>(
    models: (Q & IResourceCreate)[],
    withID?: boolean,
  ): Promise<IResponse<boolean>> {
    try {
      const result = await this.repository.insertMany<
        IResourceCreate & IResource
      >(models as any, withID)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to upload'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      console.log(error)
      return {statusCode: 500, data: error.message}
    }
  }
}
