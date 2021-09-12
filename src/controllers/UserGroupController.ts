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
import {userGroupService} from '../loaders/services'
import {IUserGroup} from '../models/UserGroup'

@JsonController()
export default class userGroupController {
  @Get('/userGroup')
  async getAll(@Req() request: PCLRequest, @Res() response: Response) {
    const {statusCode, data} = await userGroupService.findAll()
    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/userGroup/:id')
  async getOne(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await userGroupService.findById(id)
    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/userGroup')
  async post(
    @Body() userGroup: IUserGroup,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await userGroupService.insert(userGroup)
    return response.status(statusCode).json({statusCode, data})
  }

  @Put('/userGroup/:id')
  async put(
    @Param('id') id: number,
    @Body() userGroup: IUserGroup,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await userGroupService.update(id, userGroup)
    return response.status(statusCode).json({statusCode, data})
  }

  @Delete('/userGroup/:id')
  async remove(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await userGroupService.deleteById(id)
    return response.status(statusCode).json({statusCode, data})
  }
}
