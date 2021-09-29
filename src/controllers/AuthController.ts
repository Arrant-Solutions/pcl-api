/* eslint-disable class-methods-use-this */
import {JsonController, Body, Post, Req, Res, Get, Param} from 'routing-controllers'
import {Response} from 'express'
import {PCLRequest} from '../types'
import {authService, userService} from '../loaders/services'
import {ICreateUser} from '../models/User'

@JsonController()
export default class AuthController {
  @Get('/auth/fetchUser')
  async fetchUser(
    @Param('email') email: string,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await userService.findOne({email})

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
