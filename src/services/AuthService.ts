import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import {Errors, jwtExpiry, jwtSecret} from '../config'
import {ICreateUser, ICredential, IUser, IUserView, User} from '../models/User'
import {IResponse} from '../types'
import UserService from './UserService'

export default class AuthService {
  private userService: UserService
  constructor(userService: UserService) {
    this.userService = userService
  }

  public async login({
    email,
    password,
  }: ICredential): Promise<
    IResponse<{user: Omit<IUser, 'password' | 'password_salt'>; token: string}>
  > {
    const {statusCode, data} =
      await this.userService.executeRawQuery<IUserView>(
        'SELECT * FROM user_view WHERE email = $1',
        [email],
      )

    if (typeof data === 'string' || data === null || data.length === 0) {
      return {statusCode, data: 'Unable to find user with specified email'}
    }

    const found = data[0]
    const correctPassword = await argon2.verify(found.password, password)
    if (!correctPassword) {
      return {statusCode: 403, data: 'Invalid email/password combination'}
    }

    const user = new User(found)
    delete user.password

    return {
      statusCode: 200,
      data: {
        user,
        token: this.generateJWT(found),
      },
    }
  }

  public async register(
    user: ICreateUser,
  ): Promise<IResponse<ICreateUser | false>> {
    const found = await this.userService.findOne({
      phone: user.phone,
      email: user.email,
    })

    if (
      !/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*\\{}%()//])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/.test(
        user.password,
      )
    ) {
      return {
        statusCode: 422,
        data:
          'Please ensure the password contains at least ' +
          '1 special character (.e.g. @#$%&), ' +
          '1 capital letter 1, ' +
          '1 number lower case letter, 1 number ' +
          'and must be 8 characters or more',
      }
    }

    if (found) {
      return {
        statusCode: 409,
        data: `Duplicate phone: ${user.phone} or email: ${user.email}`,
      }
    }

    const created = await this.userService.insert(user)

    if (created) {
      return created
    }

    return {statusCode: 500, data: Errors.System}
  }

  // eslint-disable-next-line class-methods-use-this
  generateJWT(user: IUserView): string {
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
