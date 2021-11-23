/* eslint-disable class-methods-use-this */
import 'reflect-metadata'
import {InterceptorInterface, Action} from 'routing-controllers'

export default class AuthResponseInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    console.log(content)
    return JSON.stringify({statusCode: 401, data: 'Unauthorized'})
  }
}
