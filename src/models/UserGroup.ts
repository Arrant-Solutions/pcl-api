import {IModel, Model} from './IModel'

export interface IUserGroup extends IModel {
  user_group_id: number
  user_group_name: string
}

export class UserGroup extends Model implements IUserGroup {
  user_group_id: number
  user_group_name: string
}
