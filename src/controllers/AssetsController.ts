/* eslint-disable class-methods-use-this */
import {Get, JsonController, Req, Res} from 'routing-controllers'
import {Request, Response} from 'express'
import {
  branchService,
  countryService,
  genderService,
  userGroupService,
  userStatusService,
} from '../loaders/services'

@JsonController()
export default class AssetsController {
  @Get('/assets')
  async getAll(@Req() request: Request, @Res() response: Response) {
    console.log('started')
    const branches = await branchService.findAll()
    const genders = await genderService.findAll()
    const countries = await countryService.findAll()
    const userStatuses = await userStatusService.findAll()
    const userGroups = await userGroupService.findAll()

    console.log(
      JSON.stringify(
        {
          branches: branches.data,
          genders: genders.data,
          countries: countries.data,
          userGroups: userGroups.data,
          userStatuses: userStatuses.data,
        },
        null,
        2,
      ),
    )

    if (
      branches.statusCode !== 200 ||
      genders.statusCode !== 200 ||
      countries.statusCode !== 200 ||
      userStatuses.statusCode !== 200 ||
      userGroups.statusCode !== 200
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
        userGroups: userGroups.data,
        userStatuses: userStatuses.data,
      },
    })
  }
}
