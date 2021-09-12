import {IModel, Model} from './IModel'

export interface IResourceType extends IModel {
  resource_type_id: number
  resource_type_name: string
}

export class ResourceType extends Model implements IResourceType {
  resource_type_id: number
  resource_type_name: string
}
