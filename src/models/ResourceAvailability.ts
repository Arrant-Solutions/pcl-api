import {
  IsOptional,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface IResourceAvailability extends IModel {
  resource_availability_id: number
  resource_availability_name: string
}

export class ResourceAvailability
  extends Model
  implements IResourceAvailability, ICreate<IResourceAvailability>
{
  @IsOptional()
  @IsInt()
  @IsPositive()
  resource_availability_id: number

  @IsString()
  @MaxLength(20)
  resource_availability_name: string

  set assign({
    resource_availability_id,
    resource_availability_name,
  }: IResourceAvailability) {
    this.resource_availability_id = resource_availability_id
    this.resource_availability_name = resource_availability_name
  }
}
