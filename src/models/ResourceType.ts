import { IsOptional, IsInt, IsPositive, IsString, Max } from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface IResourceType extends IModel {
  resource_type_id: number
  resource_type_name: string
}

export class ResourceType
  extends Model
  implements IResourceType, ICreate<IResourceType>
{
  @IsOptional()
  @IsInt()
  @IsPositive()
  resource_type_id: number

  @IsString()
  @Max(30)
  resource_type_name: string

  set assign({resource_type_id, resource_type_name}: IResourceType) {
    this.resource_type_id = resource_type_id
    this.resource_type_name = resource_type_name
  }
}
