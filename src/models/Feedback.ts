import {Optional} from '../types'
import {IModel, Model} from './IModel'
import {IUser, IUserView} from './User'

export interface IFeedback extends IModel {
  feedback_id: number
  rating: number
  message: string
  user: IUser
}

export interface IFeedbackCreate {
  Feedback_id: number
  rating: number
  message: string
  user_id: number
}

export type FeedbackCreateT = Optional<IFeedback & IFeedbackCreate, 'user'>

export type IFeedbackView = IFeedback & IUserView

export class Feedback extends Model implements IFeedback {
  feedback_id: number
  rating: number
  message: string
  user: IUser

  constructor(arg: Optional<IFeedback, 'user'> & Partial<IUserView>) {
    super()
    if (arg.first_name && arg.last_name) {
      this.feedback_id = arg.feedback_id
      this.rating = arg.rating
      this.message = arg.message
      this.user = {
        user_id: arg.user_id,
        first_name: arg.first_name,
        last_name: arg.last_name,
        email: arg.email,
        phone: arg.phone,
        date_of_birth: arg.date_of_birth,
        user_group: {
          user_group_id: arg.user_group_id,
          user_group_name: arg.user_group_name,
        },
        country: {
          country_id: arg.country_id,
          country_name: arg.country_name,
          country_abbr: arg.country_abbr,
          country_code: arg.country_code,
        },
        gender: {
          gender_id: arg.gender_id,
          gender_name: arg.gender_name,
        },
        branch: {
          branch_id: arg.branch_id,
          branch_name: arg.branch_name,
        },
        user_status: {
          user_status_id: arg.user_status_id,
          user_status_name: arg.user_status_name,
        },
      }
    }
  }
}
