import {
  IsOptional,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface IUserStatus extends IModel {
  user_status_id: number
  user_status_name: string
}

export class UserStatus
  extends Model
  implements IUserStatus, ICreate<IUserStatus>
{
  @IsOptional()
  @IsInt()
  @IsPositive()
  user_status_id: number

  @IsString()
  @MaxLength(30)
  user_status_name: string

  set assign({user_status_id, user_status_name}) {
    this.user_status_id = user_status_id
    this.user_status_name = user_status_name
  }
}
