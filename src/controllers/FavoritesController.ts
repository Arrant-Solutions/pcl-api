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
  UseBefore,
} from 'routing-controllers'
import {Response} from 'express'
import {PCLRequest} from '../types'
import {CreateFavoriteT} from '../models/Favorite'
import roleBasedAuth from '../middleware/roleBasedAuth'
import {favoriteService} from '../loaders/services'

@JsonController()
@UseBefore(
  roleBasedAuth(['Customer', 'Content Manager', 'Management', 'Super User']),
)
export default class FavoritesController {
  @Get('/favorites')
  async getAll(@Req() request: PCLRequest, @Res() response: Response) {
    const {statusCode, data} = await favoriteService.find({
      user_id: request.user.user_id,
    })
    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/favorites/:id')
  async getOne(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await favoriteService.findOne({
      favorite_id: id,
      user_id: request.user.user_id,
    })
    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/favorites')
  async post(
    @Body() Favorites: CreateFavoriteT,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await favoriteService.insert(Favorites)
    return response.status(statusCode).json({statusCode, data})
  }

  @Put('/favorites/:id')
  async put(
    @Param('id') id: number,
    @Body() favorite: CreateFavoriteT,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await favoriteService.update(
      id,
      favorite,
      request.user.user_id,
    )
    return response.status(statusCode).json({statusCode, data})
  }

  @Delete('/favorites/:id')
  async remove(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await favoriteService.delete({
      user_id: request.user.user_id,
      favorite_id: id,
    })
    return response.status(statusCode).json({statusCode, data})
  }
}
