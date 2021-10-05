// import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import {emailRegex, jwtExpiry, jwtSecret, publicKey} from '../config'
import {isUnderAge} from '../helpers'
// import {auth} from '../loaders/firebase'
import {ICreateUserT, IUser} from '../models/User'
import {IResponse} from '../types'
import UserService from './UserService'

export default class AuthService {
  private userService: UserService
  constructor(userService: UserService) {
    this.userService = userService
  }

  public async fetchUser(email: string) {
    const {statusCode, data} = await this.userService.findOne(
      {email},
      false,
      true,
    )

    if (typeof data === 'string') {
      return {
        statusCode,
        data,
      }
    }

    console.log(JSON.stringify(data, null, 2))
    // const token = this.generateJWT(result)

    // const decoded = this.decodeJWT(token)

    // console.log(decoded)

    if (/^(Blocked|Disabled)$/i.test(data.user_status_name)) {
      return {
        statusCode: 401,
        data: `Your account was ${data.user_status_name}. Please contact support.`,
      }
    }

    const token = this.generateJWT(data)

    console.log('token', token)

    return {statusCode: 200, data: {user: data, token}}
  }

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
        data: `Duplicate email: ${user.email}`,
      }
    }

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

    return {statusCode: status, data: result}
  }

  // eslint-disable-next-line class-methods-use-this
  generateJWT(user: ICreateUserT): string {
    const data = {
      user_id: user.user_id,
      phone: user.phone,
      email: user.email,
    }
    const passphrase = jwtSecret
    const expiration = jwtExpiry

    return jwt.sign(
      {data},
      {key: publicKey, passphrase},
      {
        expiresIn: expiration,
        algorithm: 'RS256',
      },
    )
  }

  // eslint-disable-next-line class-methods-use-this
  decodeJWT(
    token: string,
  ):
    | Pick<IUser, 'user_id' | 'phone' | 'email'>
    | jwt.TokenExpiredError
    | jwt.JsonWebTokenError {
    try {
      console.log(jwtSecret, token)
      const decoded = jwt.verify(token, jwtSecret)
      console.log(decoded)
      return decoded as ICreateUserT
    } catch (error) {
      console.log(error)
      return error as jwt.TokenExpiredError | jwt.JsonWebTokenError
    }
  }
}
