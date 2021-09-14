import {Type} from 'class-transformer'
import {Branch, IBranch} from './Branch'
import {Country, ICountry} from './Country'
import {Gender, IGender} from './Gender'
import {IModel, Model} from './IModel'
import {IUserGroup, UserGroup} from './UserGroup'
import {IUserStatus, UserStatus} from './UserStatus'

// due to dependency cycle dude brought here
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

export interface IUserView extends IModel {
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  user_group_name: string
  user_group_id: number
  country_name: string
  country_id: number
  country_abbr: string
  gender_name: string
  gender_id
  branch_id: number
  branch_name: string
  user_status_id: number
  user_status_name: string
}

export interface ICredential {
  email: string
  password: string
}

export type ICreateUser = Optional<
  IUserView,
  | 'user_group_name'
  | 'gender_name'
  | 'country_name'
  | 'country_abbr'
  | 'branch_name'
  | 'user_status_name'
> & {
  password: string
  password_salt: string
}

export interface IUser extends IModel {
  user_id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  password?: string
  salt?: string
  date_of_birth: string
  user_group: IUserGroup
  country: ICountry
  gender: IGender
  user_status: IUserStatus
  readonly branch: IBranch
}

export class User extends Model implements IUser {
  user_id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  password?: string
  salt?: string
  date_of_birth: string

  @Type(() => UserGroup)
  user_group: IUserGroup

  @Type(() => Country)
  country: ICountry

  @Type(() => Gender)
  gender: IGender

  @Type(() => Branch)
  branch: IBranch

  @Type(() => UserStatus)
  user_status: IUserStatus

  static isUserView(
    object: Record<
      string,
      number | string | IGender | ICountry | IUserGroup | Date
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
      typeof object.gender_id === 'number' &&
      typeof object.gender_name === 'string' &&
      typeof object.user_group_id === 'number' &&
      typeof object.user_group_name === 'string'
    )
  }
}
