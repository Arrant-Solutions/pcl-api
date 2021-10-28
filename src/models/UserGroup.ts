import {
  IsOptional,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface IUserGroup extends IModel {
  user_group_id: number
  user_group_name: string
}

export class UserGroup
  extends Model
  implements IUserGroup, ICreate<IUserGroup>
{
  @IsOptional()
  @IsInt()
  @IsPositive()
  user_group_id: number

  @IsString()
  @MaxLength(30)
  user_group_name: string

  set assign({user_group_id, user_group_name}) {
    this.user_group_id = user_group_id
    this.user_group_name = user_group_name
  }
}
