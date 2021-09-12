import * as argon2 from 'argon2'
import * as jwt from 'jsonwebtoken'
import { jwtExpiry, jwtSecret } from '../config'
import {IUser} from '../models/User'
import {UserRepository} from '../repositories'

export default class AuthService {
  userRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async login(
    email: string,
    password: string,
  ): Promise<{user: IUser; token: string}> {
    const userRecord = await this.userRepository.findOne({email})

    if (!userRecord) {
      throw new Error('User not found')
    } else {
      const correctPassword = await argon2.verify(userRecord.password, password)
      if (!correctPassword) {
        throw new Error('Incorrect password')
      }
    }

    userRecord.password = undefined
    return {
      user: userRecord,
      token: this.generateJWT(userRecord),
    }
  }

  // eslint-disable-next-line class-methods-use-this
  generateJWT(user: IUser): string {
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
