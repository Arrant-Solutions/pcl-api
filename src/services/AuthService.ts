// import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import {emailRegex, jwtExpiry, jwtSecret} from '../config'
import {isUnderAge} from '../helpers'
// import {auth} from '../loaders/firebase'
import {ICreateUserT} from '../models/User'
import {IResponse} from '../types'
import UserService from './UserService'

export default class AuthService {
  private userService: UserService
  constructor(userService: UserService) {
    this.userService = userService
  }

  public async fetchUser(email: string) {
    const {statusCode, data} = await this.userService.findOne({email})

    if (typeof data === 'string') {
      return {
        statusCode,
        data,
      }
    }

    // if (data.user_status_name === 'Pending Verification') {
    //   return {
    //     statusCode: 401,
    //     data: 'Please verify your account and try again',
    //   }
    // }

    if (/^(Blocked|Disabled)$/i.test(data.user_status_name)) {
      return {
        statusCode: 401,
        data: `Your account was ${data.user_status_name}. Please contact support.`,
      }
    }

    const token = this.generateJWT(data)

    return {statusCode: 200, data: {user: data, token}}
  }

  // public async login({
  //   email,
  // }: // password,
  // ICredential): Promise<
  //   IResponse<{user: Omit<IUser, 'password' | 'password_salt'>; token: string}>
  // > {
  //   const {statusCode, data} =
  //     await this.userService.executeRawQuery<IUserView>(
  //       'SELECT * FROM user_view WHERE lower(email) = lower($1)',
  //       [email],
  //     )

  //   if (typeof data === 'string' || data === null || data.length === 0) {
  //     return {statusCode, data: 'Unable to find user with specified email'}
  //   }

  //   const found = data[0]

  //   if (found.user_status_name === 'Pending Verification') {
  //     return {statusCode: 401, data: 'Please verify your account and try again'}
  //   }

  //   if (/^(Blocked|Disabled)$/i.test(found.user_status_name)) {
  //     return {
  //       statusCode: 401,
  //       data: `Your account was ${found.user_status_name}. Please contact support.`,
  //     }
  //   }

  //   // const correctPassword = await argon2.verify(found.password, password)
  //   // if (!correctPassword) {
  //   //   return {statusCode: 403, data: 'Invalid email/password combination'}
  //   // }

  //   const user = new User(found)
  //   // delete user.password

  //   return {
  //     statusCode: 200,
  //     data: user,
  //   }
  // }

  public async register(user: ICreateUserT): Promise<
    IResponse<
      | {
          user: ICreateUserT
          token: string
        }
      | string
    >
  > {
    if (isUnderAge(user.date_of_birth)) {
      return {statusCode: 422, data: 'You are under age.'}
    }

    if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(user.first_name)) {
      return {statusCode: 422, data: 'Please input a valid first name'}
    }

    if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(user.last_name)) {
      return {statusCode: 422, data: 'Please input a valid last name'}
    }

    if (!/^(1|2)$/.test(String(user.gender_id))) {
      return {statusCode: 422, data: 'Please select a valid gender'}
    }

    if (!(user.country_id > 0 && user.country_id < 254)) {
      return {statusCode: 422, data: 'Please select a valid country'}
    }

    if (!new RegExp(emailRegex, 'i').test(user.email)) {
      return {statusCode: 422, data: 'Please input a valid email address'}
    }

    const {statusCode} = await this.userService.findOne(
      {
        phone: user.phone,
        email: user.email,
      },
      true,
    )

    if (statusCode === 200) {
      return {
        statusCode: 409,
        data: `Duplicate phone: ${user.phone} or email: ${user.email}`,
      }
    }

    // if (typeof data === 'string') {
    //   return {statusCode, data}
    // }

    const {statusCode: status, data: result} = await this.userService.insert({
      ...user,
      user_group_id: 4, // default to customer
      user_status_id: user.user_status_id || 3, // default to pending activation
    })

    if (typeof result === 'object') {
      const token = this.generateJWT(result)

      return {
        statusCode: status,
        data: {
          user: result,
          token,
        },
      }
    }

    // if (status === 200 && typeof data === 'object') {
    //   delete data.password
    //   delete data.password_salt
    // }
    return {statusCode: status, data: result}
  }

  // eslint-disable-next-line class-methods-use-this
  generateJWT(user: ICreateUserT): string {
    const data = {
      user_id: user.user_id,
      phone: user.phone,
      email: user.email,
    }
    const signature = jwtSecret
    const expiration = jwtExpiry

    return jwt.sign({data}, signature, {expiresIn: expiration})
  }
}
