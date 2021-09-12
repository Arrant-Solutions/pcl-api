import * as argon2 from 'argon2'
import {randomBytes} from 'crypto'
import {ICreateUser, IUser} from '../models/User'
import {IResponse} from '../types'
import BaseService from './BaseService'

export default class UserService extends BaseService<IUser, ICreateUser> {
  public async insert<Q = Partial<IUser>>(
    model: Q & ICreateUser,
  ): Promise<IResponse<ICreateUser | false>> {
    try {
      const salt = randomBytes(32)
      const password = await argon2.hash(model.password, {salt})

      const result = await this.repository.insert<ICreateUser>({
        ...model,
        password,
        salt: salt.toString('hex'),
      })

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to upload'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message}
    }
  }
}
