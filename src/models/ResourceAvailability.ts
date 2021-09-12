import {IModel, Model} from './IModel'

export interface IResourceAvailability extends IModel {
  resource_availability_id: number
  resource_availability_name: string
}

export class ResourceAvailability
  extends Model
  implements IResourceAvailability
{
  resource_availability_id: number
  resource_availability_name: string
}
