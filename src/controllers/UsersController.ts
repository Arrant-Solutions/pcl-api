/* eslint-disable class-methods-use-this */
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
} from 'routing-controllers'
import {Response} from 'express'
import {PCLRequest} from '../types'
import {userService} from '../loaders/services'
import {IUser} from '../models/User'

@JsonController()
export default class userController {
  @Get('/users')
  async getAll(@Req() request: PCLRequest, @Res() response: Response) {
    const {statusCode, data} = await userService.findAll()
    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/users/:id')
  async getOne(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await userService.findById(id)
    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/users')
  async post(
    @Body() user: IUser,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await userService.insert(user)
    return response.status(statusCode).json({statusCode, data})
  }

  @Put('/users/:id')
  async put(
    @Param('id') id: number,
    @Body() user: IUser,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await userService.update(id, user)
    return response.status(statusCode).json({statusCode, data})
  }

  @Delete('/users/:id')
  async remove(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await userService.deleteById(id)
    return response.status(statusCode).json({statusCode, data})
  }
}
