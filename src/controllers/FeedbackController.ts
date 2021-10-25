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
import {feedbackService} from '../loaders/services'
import {FeedbackCreateT} from '../models/Feedback'

@JsonController()
export default class feedbackController {
  @Get('/feedback')
  async getAll(@Req() request: PCLRequest, @Res() response: Response) {
    const {statusCode, data} = await feedbackService.findAll()
    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/feedback/:id')
  async getOne(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await feedbackService.findById(id)
    return response.status(statusCode).json({statusCode, data})
  }

  @Post('/feedback')
  async post(
    @Body() feedback: FeedbackCreateT,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await feedbackService.insert(feedback)
    return response.status(statusCode).json({statusCode, data})
  }

  @Get('/feedback/byUser/:user_id')
  async fetchUser(
    @Param('user_id') user_id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    try {
      const {statusCode, data} = await feedbackService.find({user_id})

      return response.status(statusCode).json({statusCode, data})
    } catch (error) {
      return response.status(500).json({statusCode: 500, data: error})
    }
  }

  @Put('/feedback/:id')
  async put(
    @Param('id') id: number,
    @Body() feedback: FeedbackCreateT,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await feedbackService.update(id, feedback)
    return response.status(statusCode).json({statusCode, data})
  }

  @Delete('/feedback/:id')
  async remove(
    @Param('id') id: number,
    @Req() request: PCLRequest,
    @Res() response: Response,
  ) {
    const {statusCode, data} = await feedbackService.deleteById(id)
    return response.status(statusCode).json({statusCode, data})
  }
}
