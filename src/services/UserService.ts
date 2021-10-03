// import * as argon2 from 'argon2'
// import * as Bluebird from 'bluebird'
// import {randomBytes} from 'crypto'
import {ICreateUser, ICreateUserT, IUser} from '../models/User'
import {IResponse} from '../types'
import BaseService from './BaseService'

export default class UserService extends BaseService<ICreateUserT> {
  public async insert<T extends ICreateUserT>(
    model: T,
    withID?: boolean,
  ): Promise<IResponse<T>> {
    try {
      // const salt = randomBytes(32)
      // const password = await argon2.hash(model.password, {salt})

      const result = await this.repository.insert<T>(model, withID)

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to upload'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      return {statusCode: 500, data: error.message as string}
    }
  }

  public async insertMany<Q = Partial<IUser>>(
    models: (Q & ICreateUser)[],
    withID?: boolean,
  ): Promise<IResponse<boolean>> {
    try {
      // const users = await Bluebird.map(models, async item => {
      //   const salt = randomBytes(32)
      //   const password = await argon2.hash(item.password, {salt})

      //   return {
      //     ...item,
      //     password,
      //     password_salt: salt.toString('hex'),
      //   }
      // })

      const result = await this.repository.insertMany<ICreateUser & IUser>(
        models as any,
        withID,
      )

      if (typeof result === 'boolean') {
        return {statusCode: 500, data: 'Failed to upload'}
      }

      return {statusCode: 200, data: result}
    } catch (error) {
      console.log(error)
      return {statusCode: 500, data: error.message}
    }
  }
}
