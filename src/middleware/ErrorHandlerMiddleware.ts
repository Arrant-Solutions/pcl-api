/* eslint-disable class-methods-use-this */
import {Response, NextFunction} from 'express'
import {ExpressErrorMiddlewareInterface, Middleware} from 'routing-controllers'
import {INTERNAL_ERROR} from '../config/error'
import {PCLRequest} from '../types'

@Middleware({type: 'after'})
export default class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, req: PCLRequest, response: Response, next: NextFunction) {
    if (error) {
      if (response.headersSent) {
        return response.end()
      }

      if (error.httpCode && error.message) {
        return response
          .status(error.httpCode)
          .json({statusCode: error.httpCode, data: error.message})
      }
      return response.status(500).json({statusCode: 500, data: INTERNAL_ERROR})
    }

    return next()
  }
}
