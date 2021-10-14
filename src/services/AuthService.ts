// import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import {emailRegex, JWT_EXPIRY, PRIVATE_KEY} from '../config'
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

  public async fetchUser(
    {
      email,
      user_id,
    }: // phone,
    {
      email: string
      user_id?: number
      phone?: string
    },
    andFilter?: boolean,
  ) {
    const {statusCode, data} = await this.userService.findOne(
      andFilter ? {email, user_id} : {email},
      false,
      true,
    )

    if (typeof data === 'string') {
      return {
        statusCode,
        data,
      }
    }

    if (/^(Blocked|Disabled)$/i.test(data.user_status_name)) {
      return {
        statusCode: 401,
        data: `Your account was ${data.user_status_name}. Please contact support.`,
      }
    }

    const token = this.generateJWT(data)

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

  public async refreshToken(token: string) {
    const decoded = this.decodeJWT(token)

    if (typeof decoded === 'string') {
      return {statusCode: 401, data: decoded}
    }

    const response = await this.fetchUser(decoded, true)

    return response
  }

  // eslint-disable-next-line class-methods-use-this
  generateJWT(user: ICreateUserT): string {
    const data = {
      user_id: user.user_id,
      phone: user.phone,
      email: user.email,
    }

    const expiration = JWT_EXPIRY

    return jwt.sign({data}, PRIVATE_KEY, {
      expiresIn: expiration,
      algorithm: 'RS256',
    })
  }

  // eslint-disable-next-line class-methods-use-this
  public decodeJWT(
    token: string,
  ): Pick<ICreateUserT, 'user_id' | 'phone' | 'email'> | string {
    try {
      const decoded = jwt.verify(token, PRIVATE_KEY, {
        algorithms: 'RS256',
      })

      return decoded.data as Pick<ICreateUserT, 'user_id' | 'phone' | 'email'>
    } catch (error) {
      return error.message as string
    }
  }
}
