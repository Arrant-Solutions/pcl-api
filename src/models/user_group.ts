export interface IUserGroup {
  user_group_id: number
  user_group_name: string
}

export class UserGroup implements IUserGroup {
  user_group_id: number
  user_group_name: string

  constructor({user_group_name, user_group_id}: IUserGroup) {
    this.user_group_id = user_group_id
    this.user_group_name = user_group_name
  }
}
