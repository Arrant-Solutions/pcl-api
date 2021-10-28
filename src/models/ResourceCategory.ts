import {
  IsOptional,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface IResourceCategory extends IModel {
  resource_category_id: number
  resource_category_name: string
}

export class ResourceCategory
  extends Model
  implements IResourceCategory, ICreate<IResourceCategory>
{
  @IsOptional()
  @IsInt()
  @IsPositive()
  resource_category_id: number

  @IsString()
  @MaxLength(30)
  resource_category_name: string

  set assign({
    resource_category_id,
    resource_category_name,
  }: IResourceCategory) {
    this.resource_category_id = resource_category_id
    this.resource_category_name = resource_category_name
  }
}
