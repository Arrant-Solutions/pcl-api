import {Branch, IBranch} from './branch'
import {Country, ICountry} from './country'
import {Gender, IGender} from './gender'
import {IUserGroup, UserGroup} from './user_group'

export interface IUserView {
  first_name: string
  last_name: string
  email: string
  phone: string
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

export interface IUser {
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  user_group: IUserGroup
  branch: IBranch
  country: ICountry
  gender: IGender
}

export class User implements IUser {
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  user_group: IUserGroup
  branch: IBranch
  country: ICountry
  gender: IGender

  static isUserView(
    object: Record<
      string,
      number | string | IGender | ICountry | IUserGroup | IBranch
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

  constructor(object: Partial<IUser & IUserView>) {
    if (User.isUserView(object)) {
      const {
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        user_group_id,
        user_group_name,
        branch_id,
        branch_name,
        country_id,
        country_name,
        country_abbr,
        gender_id,
        gender_name,
      } = object
      this.first_name = first_name
      this.last_name = last_name
      this.email = email
      this.phone = phone
      this.date_of_birth = date_of_birth
      this.user_group = new UserGroup({user_group_id, user_group_name})
      this.branch = new Branch({branch_id, branch_name})
      this.country = new Country({country_id, country_name, country_abbr})
      this.gender = new Gender({gender_id, gender_name})
    } else {
      const {
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        user_group,
        branch,
        country,
        gender,
      } = object

      this.first_name = first_name
      this.last_name = last_name
      this.email = email
      this.phone = phone
      this.date_of_birth = date_of_birth
      this.user_group = user_group
      this.branch = branch
      this.country = country
      this.gender = gender
    }
  }
}
