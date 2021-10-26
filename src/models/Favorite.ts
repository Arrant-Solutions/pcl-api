import {IsInt, IsOptional, IsPositive} from 'class-validator'
import {Optional} from '../types'
import {ICreate, IModel} from './IModel'

export interface IFavorite extends IModel {
  favorite_id: number
  resource_id: number
  user_id: number
}

export type CreateFavoriteT = Optional<IFavorite, 'favorite_id'>

export class Favorite implements IFavorite, ICreate<IFavorite> {
  @IsOptional()
  @IsInt()
  @IsPositive()
  favorite_id: number

  @IsInt()
  @IsPositive()
  resource_id: number

  @IsInt()
  @IsPositive()
  user_id: number

  set assign({favorite_id, resource_id, user_id}: IFavorite) {
    this.favorite_id = favorite_id
    this.resource_id = resource_id
    this.user_id = user_id
  }
}
