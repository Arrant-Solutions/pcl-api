/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {NextFunction, Response} from 'express'
import {
  Middleware,
  ExpressMiddlewareInterface,
  NotFoundError,
} from 'routing-controllers'
import {API_VERSION} from '../config'
import {authService} from '../loaders/services'
import {PCLRequest} from '../types'

@Middleware({type: 'before'})
export class TokenValidationMiddleware implements ExpressMiddlewareInterface {
  async use(req: PCLRequest, response: Response, next: NextFunction) {
    const regex = new RegExp(
      `^/api/${API_VERSION}/(assets|auth/(register|refreshToken|fetchUser(.*)))(/)?(.*)`,
    )

    // throw new NotFoundError('User was not found.')

    if (regex.test(req.url)) {
      next()
    }

    if (
      !(
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      )
    ) {
      return response
        .status(401)
        .json({statusCode: 401, data: 'Invalid authentication token'})
    }

    const user = await authService.findUserByToken(req.headers.authorization)

    if (typeof user === 'string') {
      return response
        .status(401)
        .json({statusCode: 401, data: 'Invalid authentication token'})
    }

    // eslint-disable-next-line no-param-reassign
    req.user = user

    return next()
  }
}
