import {IsOptional, IsInt, IsPositive, IsString, Max} from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface IMediaType extends IModel {
  media_type_id: number
  media_type_name: string
}

export class MediaType
  extends Model
  implements IMediaType, ICreate<IMediaType>
{
  @IsOptional()
  @IsInt()
  @IsPositive()
  media_type_id: number

  @IsString()
  @Max(10)
  media_type_name: string

  set assign({media_type_id, media_type_name}: IMediaType) {
    this.media_type_id = media_type_id
    this.media_type_name = media_type_name
  }
}
