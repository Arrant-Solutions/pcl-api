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
import {countryService} from '../loaders/services'
import {ICountry} from '../models/country'

@JsonController()
export default class countryController {
  @Get('/country')
  async getAll(@Req() request: PCLRequest, @Res() response: Response) {
    const {statusCode, data} = await countryService.findAll()
    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/country/:id')
  async getOne(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await countryService.findById(id)
    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/country')
  async post(
    @Body() country: ICountry,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await countryService.insert(country)
    return response.status(statusCode).json({statusCode, data})
  }

  @Put('/country/:id')
  async put(
    @Param('id') id: number,
    @Body() country: ICountry,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await countryService.update(id, country)
    return response.status(statusCode).json({statusCode, data})
  }

  @Delete('/country/:id')
  async remove(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await countryService.deleteById(id)
    return response.status(statusCode).json({statusCode, data})
  }
}
