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
import {genderService} from '../loaders/services'
import {IGender} from '../models/gender'

@JsonController()
export default class genderController {
  @Get('/gender')
  async getAll(@Req() request: PCLRequest, @Res() response: Response) {
    const {statusCode, data} = await genderService.findAll()
    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/gender/:id')
  async getOne(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await genderService.findById(id)
    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/gender')
  async post(
    @Body() gender: IGender,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await genderService.insert(gender)
    return response.status(statusCode).json({statusCode, data})
  }

  @Put('/gender/:id')
  async put(
    @Param('id') id: number,
    @Body() gender: IGender,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await genderService.update(id, gender)
    return response.status(statusCode).json({statusCode, data})
  }

  @Delete('/gender/:id')
  async remove(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await genderService.deleteById(id)
    return response.status(statusCode).json({statusCode, data})
  }
}
