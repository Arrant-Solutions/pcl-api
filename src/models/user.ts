import {Type} from 'class-transformer'
import {Branch, IBranch} from './branch'
import {Country, ICountry} from './country'
import {Gender, IGender} from './gender'
import {IModel, Model} from './IModel'
import {IUserGroup, UserGroup} from './user_group'

export interface IUserView extends IModel {
  first_name: string
  last_name: string
  email: string
  phone: string
  password?: string
  date_of_birth: string
  user_group_name: string
  user_group_id: number
  branch_name: string
  branch_id: number
  country_name: string
  country_id: number
  country_abbr: string
  gender_name: string
  gender_id
}

export interface IUser extends IModel {
  user_id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  password?: string
  date_of_birth: string
  user_group: IUserGroup
  branch: IBranch
  country: ICountry
  gender: IGender
}

export class User extends Model implements IUser {
  user_id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  password?: string
  date_of_birth: string
  @Type(() => UserGroup)
  user_group: IUserGroup
  @Type(() => Branch)
  branch: IBranch
  @Type(() => Country)
  country: ICountry
  @Type(() => Gender)
  gender: IGender

  static isUserView(
    object: Record<
      string,
      number | string | IGender | ICountry | IUserGroup | IBranch | Date
    >,
  ): boolean {
    return (
      typeof object === 'object' &&
      typeof object.first_name === 'string' &&
      typeof object.last_name === 'string' &&
      typeof object.email === 'string' &&
      typeof object.phone === 'string' &&
      typeof object.country_id === 'number' &&
      typeof object.country_abbr === 'string' &&
      typeof object.country_name === 'string' &&
      typeof object.branch_id === 'number' &&
      typeof object.branch_name === 'string' &&
      typeof object.gender_id === 'number' &&
      typeof object.gender_name === 'string' &&
      typeof object.user_group_id === 'number' &&
      typeof object.user_group_name === 'string'
    )
  }
}
