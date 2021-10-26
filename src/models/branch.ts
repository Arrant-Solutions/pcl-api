import {IsInt, IsOptional, IsPositive, IsString, Max} from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface IBranch extends IModel {
  branch_id: number
  branch_name: string
}

export class Branch extends Model implements IBranch, ICreate<IBranch> {
  @IsOptional()
  @IsInt()
  @IsPositive()
  branch_id: number

  @IsString()
  @Max(100)
  branch_name: string

  set assign({branch_id, branch_name}: IBranch) {
    this.branch_id = branch_id
    this.branch_name = branch_name
  }
}
