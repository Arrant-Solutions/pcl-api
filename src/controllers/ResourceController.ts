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
  UseBefore,
} from 'routing-controllers'
import {Response} from 'express'
import {PCLRequest} from '../types'
import {favoriteService, resourceService} from '../loaders/services'
import {ResourceCreateT, IResourceCreate} from '../models/Resource'
import roleBasedAuth from '../middleware/roleBasedAuth'

@JsonController()
@UseBefore(
  roleBasedAuth(['Customer', 'Content Manager', 'Management', 'Super User']),
)
export default class ResourceController {
  @Get('/resources')
  async getAll(@Req() request: PCLRequest, @Res() response: Response) {
    const {statusCode, data} = await resourceService.findAll()
    const result = await favoriteService.find({
      user_id: request.tokenData.user_id,
    })

    return response.status(statusCode).json({
      statusCode,
      data: {
        media: data,
        favorites: Array.isArray(result.data) ? result.data : [],
      },
    })
  }

  @Get('/resources/home')
  async getHomeResources(
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await resourceService.findAll()
    const result = await favoriteService.find({
      user_id: request.tokenData.user_id,
    })

    return response.status(statusCode).json({
      statusCode,
      data: {
        media: data,
        favorites: Array.isArray(result.data) ? result.data : [],
      },
    })
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
    @Body() resource: ResourceCreateT,
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
