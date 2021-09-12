import {IModel, Model} from './IModel'

export interface IUserStatus extends IModel {
  user_status_id: number
  user_status_name: string
}

export class UserStatus extends Model implements IUserStatus {
  user_status_id: number
  user_status_name: string
}
