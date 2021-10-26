import {IsInt, IsOptional, IsPositive, IsString, Max} from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface IGender extends IModel {
  gender_id: number
  gender_name: string
}

export class Gender extends Model implements IGender, ICreate<IGender> {
  @IsOptional()
  @IsInt()
  @IsPositive()
  gender_id: number

  @IsString()
  @Max(20)
  gender_name: string

  set assign({gender_id, gender_name}: IGender) {
    this.gender_id = gender_id
    this.gender_name = gender_name
  }
}
