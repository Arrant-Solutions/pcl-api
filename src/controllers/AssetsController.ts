/* eslint-disable class-methods-use-this */
import {Get, JsonController, Req, Res} from 'routing-controllers'
import {Request, Response} from 'express'
import {branchService, countryService, genderService} from '../loaders/services'

@JsonController()
export default class AssetsController {
  @Get('/assets')
  async getAll(@Req() request: Request, @Res() response: Response) {
    const branches = await branchService.findAll()
    const genders = await genderService.findAll()
    const countries = await countryService.findAll()

    if (
      branches.statusCode !== 200 ||
      genders.statusCode !== 200 ||
      countries.statusCode !== 200
    ) {
      return response.status(400).json({
        statusCode: 400,
        data: 'Failed to fetch required resources',
      })
    }

    return response.status(200).json({
      statusCode: 200,
      data: {
        branches: branches.data,
        genders: genders.data,
        countries: countries.data,
      },
    })
  }
}
