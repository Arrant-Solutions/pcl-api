import {Request} from 'express'
import {IUser} from '../models/User'

export function StaticImplements<T>(t: T) {
  return t
}

export interface PCLRequest extends Request {
  tokenData: Pick<IUser, 'email' | 'phone' | 'user_id'>
  user: IUser
}

export interface IResponse<T = unknown> {
  statusCode: number
  data: T | string
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>
