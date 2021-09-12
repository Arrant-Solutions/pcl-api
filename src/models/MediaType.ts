import {IModel, Model} from './IModel'

export interface IMediaType extends IModel {
  media_type_id: number
  media_type_name: string
}

export class MediaType extends Model implements IMediaType {
  media_type_id: number
  media_type_name: string
}
