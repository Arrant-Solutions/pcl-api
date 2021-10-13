import {Middleware, ExpressErrorMiddlewareInterface} from 'routing-controllers'

@Middleware({type: 'after'})
// eslint-disable-next-line import/prefer-default-export
export class NotFoundHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line class-methods-use-this
  error(error: any, request: any, response: any, next: () => any) {
    console.log('do something...', error)
    next()
  }
}
