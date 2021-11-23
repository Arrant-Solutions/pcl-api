import {Request} from 'express'
import {ICreateUserT, IUser} from '../models/User'

export interface PCLRequest extends Request {
  tokenData: Pick<IUser, 'email' | 'phone' | 'user_id'>
  user: ICreateUserT | IUser
}

export interface IResponse<T = unknown> {
  statusCode: number
  data: T | string
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>
