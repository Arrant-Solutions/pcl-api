import * as jwt from 'express-jwt'
import {API_VERSION, PUBLIC_KEY} from '../config'
import {authService} from '../loaders/services'
import {PCLRequest} from '../types'

export const getTokenFromHeader = async (req: PCLRequest) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const decoded = authService.decodeJWT(
      req.headers.authorization.split(' ')[1],
    )

    if (typeof decoded === 'object') {
      const {data} = await authService.fetchUser({
        user_id: decoded.user_id,
        email: decoded.email,
      })

      if (typeof data === 'object') {
        // eslint-disable-next-line no-param-reassign
        req.user = data.user
      }

      // eslint-disable-next-line no-param-reassign
      req.tokenData = decoded
    }
    return req.headers.authorization.split(' ')[1]
  }

  return ''
}

const path = `^/api/${API_VERSION}/(assets|auth/(register|refreshToken|fetchUser(.*)))(/)?(.*)`

export default jwt({
  secret: PUBLIC_KEY,
  userProperty: 'token',
  getToken: getTokenFromHeader,
  credentialsRequired: true,
  algorithms: ['RS256'],
}).unless({path: new RegExp(path)})
