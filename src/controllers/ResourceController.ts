/* eslint-disable class-methods-use-this */
import {
  JsonController,
  Body,
  Post,
  Req,
  Res,
  Get,
  Param,
  Put,
  Delete,
} from 'routing-controllers'
import {Response} from 'express'
import {PCLRequest} from '../types'
import {resourceService} from '../loaders/services'
import {IResource, IResourceCreate} from '../models/Resource'

@JsonController()
export default class ResourceController {
  @Get('/resources')
  async getAll(@Req() request: PCLRequest, @Res() response: Response) {
    const {statusCode, data} = await resourceService.findAll()
    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/resources/:id')
  async getOne(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await resourceService.findById(id)
    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/resources')
  async post(
    @Body() resource: IResourceCreate,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await resourceService.insert(resource)
    return response.status(statusCode).json({statusCode, data})
  }

  @Put('/resources/:id')
  async put(
    @Param('id') id: number,
    @Body() resource: IResource,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await resourceService.update(id, resource)
    return response.status(statusCode).json({statusCode, data})
  }

  @Delete('/resources/:id')
  async remove(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await resourceService.deleteById(id)
    return response.status(statusCode).json({statusCode, data})
  }
}
