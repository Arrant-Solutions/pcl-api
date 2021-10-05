import {NextFunction, Response} from 'express'
import {userService} from '../loaders/services'
import {PCLRequest} from '../types'

export default async (req: PCLRequest, res: Response, next: NextFunction) => {
  const decodedTokenData = req.tokenData
  const {data} = await userService.findOne(decodedTokenData)

  // eslint-disable-next-line no-param-reassign
  if (typeof data === 'object') req.user = data

  if (!data) {
    return res.status(401).json({statusCode: 401, data: 'User not found'})
  }

  return next()
}
