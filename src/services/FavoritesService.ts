import {CreateFavoriteT, IFavorite} from '../models/Favorite'
import {IResponse} from '../types'
import BaseService from './BaseService'

export default class FavoriteService extends BaseService<CreateFavoriteT> {
  public async insert<Q extends CreateFavoriteT>(
    model: Q,
    withID?: boolean,
  ): Promise<IResponse<Q | false>> {
    try {
      const result = await this.repository.insert<Q>(model, withID)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to upload'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }

  public async insertMany<Q = Partial<IFavorite>>(
    models: (Q & CreateFavoriteT)[],
    withID?: boolean,
  ): Promise<IResponse<boolean>> {
    try {
      const result = await this.repository.insertMany<
        CreateFavoriteT & IFavorite
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
