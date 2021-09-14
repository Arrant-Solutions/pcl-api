/* eslint-disable class-methods-use-this */
import {JsonController, Body, Post, Req, Res} from 'routing-controllers'
import {Response} from 'express'
import {PCLRequest} from '../types'
import {authService} from '../loaders/services'
import {ICreateUser, ICredential} from '../models/User'

@JsonController()
export default class AuthController {
  @Post('/auth/login')
  async login(
    @Body() credential: ICredential,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await authService.login(credential)

    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/auth/register')
  async register(
    @Body() user: ICreateUser,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await authService.register(user)

    return response.status(statusCode).json({statusCode, data})
  }
}
