import {NextFunction, Response} from 'express'
import {PCLRequest} from '../types'

export default (requiredRole: string) =>
  (req: PCLRequest, res: Response, next: NextFunction) => {
    if (req.user.user_group.user_group_name !== requiredRole) {
      return res.status(401).json({statusCode: 401, data: 'Unauthorized'})
    }

    return next()
  }
