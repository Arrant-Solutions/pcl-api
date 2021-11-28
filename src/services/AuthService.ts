/* eslint-disable no-useless-escape */
// import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import {JWT_EXPIRY, PRIVATE_KEY} from '../config'
// import {auth} from '../loaders/firebase'
import {ICreateUserT, User} from '../models/User'
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
      | string[]
    >
  > {
    // console.log(JSON.stringify(user, null, 2))
    if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(user.first_name)) {
      return {statusCode: 422, data: 'Please input a valid first name'}
    }

    if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(user.last_name)) {
      return {statusCode: 422, data: 'Please input a valid last name'}
    }

    if (!/^(1|2)$/.test(String(user.gender_id))) {
      return {statusCode: 422, data: 'Please select a valid gender'}
    }

    if (!(user.country_id > 0 && user.country_id <= 250)) {
      return {statusCode: 422, data: 'Please select a valid country'}
    }

    if (
      user.user_status_id &&
      !(user.user_status_id > 0 && user.user_status_id <= 4)
    ) {
      return {statusCode: 422, data: 'Please select a valid statuss'}
    }

    if (user.branch_id && !(user.branch_id > 0 && user.branch_id <= 2)) {
      return {statusCode: 422, data: 'Please select a valid branch'}
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
      branch_id: user.branch_id === 0 ? undefined : user.branch_id,
      user_group_id: 4, // default to customer
      user_status_id: user.user_status_id || 3, // default to pending activation
    })

    if (Array.isArray(result)) {
      return {statusCode: 422, data: result}
    }

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

  public async update(
    user_id: number,
    user: Partial<ICreateUserT>,
  ): Promise<IResponse<ICreateUserT | string[]>> {
    const findUserResponse = await this.userService.findById(user_id)

    if (typeof findUserResponse.data !== 'object') {
      return findUserResponse
    }

    const updateUser = {...findUserResponse.data, ...user}

    if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(updateUser.first_name)) {
      return {statusCode: 422, data: 'Please input a valid first name'}
    }

    if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(updateUser.last_name)) {
      return {statusCode: 422, data: 'Please input a valid last name'}
    }

    if (!/^(1|2)$/.test(String(updateUser.gender_id))) {
      return {statusCode: 422, data: 'Please select a valid gender'}
    }

    if (!(updateUser.country_id > 0 && updateUser.country_id <= 250)) {
      return {statusCode: 422, data: 'Please select a valid country'}
    }

    if (
      updateUser.branch_id &&
      !(updateUser.branch_id > 0 && updateUser.branch_id <= 2)
    ) {
      return {statusCode: 422, data: 'Please select a valid branch'}
    }

    const result = await this.userService.update(user_id, updateUser)

    return result
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

  // eslint-disable-next-line class-methods-use-this
  public async findUserByToken(header: string) {
    try {
      if (!(header && header.split(' ')[0] === 'Bearer')) {
        return null
      }

      const token = header.split(' ')[1]

      const {
        data: {email, user_id},
      } = jwt.verify(token, PRIVATE_KEY, {
        algorithms: 'RS256',
      }) as {data: Pick<ICreateUserT, 'user_id' | 'phone' | 'email'>}

      const {data} = await this.userService.findOne(
        {user_id, email},
        false,
        true,
      )

      return typeof data === 'object' ? new User(data) : null
    } catch (error) {
      return null
    }
  }
}
