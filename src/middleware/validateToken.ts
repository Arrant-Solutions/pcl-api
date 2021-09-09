import {NextFunction, Response} from 'express'
import {userService} from '../loaders/services'
import {PCLRequest} from '../types'

export default async (req: PCLRequest, res: Response, next: NextFunction) => {
  const decodedTokenData = req.tokenData
  const userRecord = await userService.findOne(decodedTokenData)

  // eslint-disable-next-line no-param-reassign
  req.user = userRecord

  if (!userRecord) {
    return res.status(401).json({statusCode: 401, data: 'User not found'})
  }
  return next()
}
