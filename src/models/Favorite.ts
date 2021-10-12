import {Optional} from '../types'
import {IModel} from './IModel'

export interface IFavorite extends IModel {
  favorite_id: number
  resource_id: number
  user_id: number
}

export type CreateFavoriteT = Optional<IFavorite, 'favorite_id'>
