import * as argon2 from 'argon2'
import {randomBytes} from 'crypto'
import {ICreateUser, IUser} from '../models/User'
import {IResponse} from '../types'
import BaseService from './BaseService'

export default class UserService extends BaseService<IUser, ICreateUser> {}
