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
  user_id: number
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
  country_code: string
  gender_name: string
  gender_id: number
  branch_id: number
  branch_name: string
  user_status_id: number
  user_status_name: string
  password: string
  created_at: Date
  updated_at: Date
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
>

export interface IUser extends IModel {
  user_id?: number
  first_name: string
  last_name: string
  email: string
  phone: string
  password?: string
  password_salt?: string
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
  password_salt?: string
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

  constructor(param: Partial<IUser & IUserView & ICreateUser>) {
    super()

    if (User.isUserView(param)) {
      this.user_id = param.user_id
      this.first_name = param.first_name
      this.last_name = param.last_name
      this.email = param.email
      this.phone = param.phone
      this.password = param.password
      this.password_salt = param.password_salt
      this.user_group = {
        user_group_id: param.user_group_id,
        user_group_name: param.user_group_name,
      }
      this.country = {
        country_id: param.country_id,
        country_name: param.country_name,
        country_abbr: param.country_abbr,
        country_code: param.country_code,
      }
      this.gender = {
        gender_id: param.gender_id,
        gender_name: param.gender_name,
      }
      this.branch = {
        branch_id: param.branch_id,
        branch_name: param.branch_name,
      }
      this.user_status = {
        user_status_id: param.user_status_id,
        user_status_name: param.user_status_name,
      }
    }
  }

  static isUserView(object: Partial<IUser & IUserView & ICreateUser>): boolean {
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
