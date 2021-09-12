/* eslint-disable no-unused-vars */
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
import {branchService} from '../loaders/services'
import {IBranch} from '../models/Branch'

@JsonController()
export default class BranchController {
  @Get('/branches')
  async getAll(@Req() request: PCLRequest, @Res() response: Response) {
    const {statusCode, data} = await branchService.findAll()
    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/branches/:id')
  async getOne(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await branchService.findById(id)
    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/branches')
  async post(
    @Body() branch: IBranch,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await branchService.insert(branch)
    return response.status(statusCode).json({statusCode, data})
  }

  @Put('/branches/:id')
  async put(
    @Param('id') id: number,
    @Body() branch: IBranch,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await branchService.update(id, branch)
    return response.status(statusCode).json({statusCode, data})
  }

  @Delete('/branches/:id')
  async remove(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await branchService.deleteById(id)
    return response.status(statusCode).json({statusCode, data})
  }
}
