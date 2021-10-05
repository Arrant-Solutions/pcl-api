import {Request} from 'express'
import * as jwt from 'express-jwt'
import {jwtSecret} from '../config'

const getTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  }

  return ''
}

const path = `^/api/${process.env.API_VERSION}/(assets|auth)(/)?(.*)`

export default jwt({
  secret: jwtSecret,
  userProperty: 'token',
  getToken: getTokenFromHeader,
  algorithms: ['RS256'],
}).unless({path: new RegExp(path)})
