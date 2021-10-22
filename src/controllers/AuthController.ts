/* eslint-disable class-methods-use-this */
import {
  JsonController,
  Body,
  Post,
  Req,
  Res,
  Get,
  Param,
  HeaderParam,
} from 'routing-controllers'
import {Response} from 'express'
import {PCLRequest} from '../types'
import {authService} from '../loaders/services'
import {ICreateUser} from '../models/User'

@JsonController()
export default class AuthController {
  @Post('/auth/refreshToken')
  async refreshToken(
    @HeaderParam('token') token: string,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await authService.refreshToken(token)

    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/auth/fetchUser/:email')
  async fetchUser(
    @Param('email') email: string,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    console.log(email)
    const {statusCode, data} = await authService.fetchUser({email})

    console.log(JSON.stringify(statusCode, data))

    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/auth/register')
  async register(
    @Body({required: true}) user: ICreateUser,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    console.log(JSON.stringify(user))
    const {statusCode, data} = await authService.register(user)

    return response.status(statusCode).json({statusCode, data})
  }
}
