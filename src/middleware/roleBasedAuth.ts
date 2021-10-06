import {NextFunction, Response} from 'express'
import {userService} from '../loaders/services'
import {PCLRequest} from '../types'

export default (authorizedRoles: string[]) =>
  async (req: PCLRequest, res: Response, next: NextFunction) => {
    // console.log(req.tokenData)
    if (!req.tokenData) {
      return res.status(401).json({statusCode: 401, message: 'Unauthorized'})
    }
    try {
      const {data} = await userService.findOne({
        email: req.tokenData.email,
        user_id: req.tokenData.user_id,
      })
      console.log(JSON.stringify(data, null, 5))
      if (
        typeof data === 'string' ||
        !authorizedRoles.find(item => item === data.user_group_name)
      ) {
        return res.status(401).json({statusCode: 401, data: 'Unauthorized'})
      }
    } catch (error) {
      return res.status(500).json({statusCode: 500, data: error.message})
    }

    return next()
  }
