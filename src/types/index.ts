import {Request} from 'express'
import {IUser} from '../models/user'

export function StaticImplements<T>(t: T) {
  return t
}

export interface PCLRequest extends Request {
  tokenData: Pick<IUser, 'email' | 'phone' | 'user_id'>
  user: IUser
}
