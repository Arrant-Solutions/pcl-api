import {IModel, Model} from './IModel'

export interface IResourceCategory extends IModel {
  resource_category_id: number
  resource_category_name: string
}

export class ResourceCategory extends Model implements IResourceCategory {
  resource_category_id: number
  resource_category_name: string
}
