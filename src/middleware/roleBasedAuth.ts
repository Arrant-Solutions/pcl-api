import {NextFunction, Response} from 'express'
import {PCLRequest} from '../types'

export default (authorizedRoles: string[]) =>
  (req: PCLRequest, res: Response, next: NextFunction) => {
    if (
      !authorizedRoles.find(
        item => item === req.user.user_group.user_group_name,
      )
    ) {
      return res.status(401).json({statusCode: 401, data: 'Unauthorized'})
    }

    return next()
  }
