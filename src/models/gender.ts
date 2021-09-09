import {IModel, Model} from './IModel'

export interface IGender extends IModel {
  gender_id: number
  gender_name: string
}

export class Gender extends Model implements IGender {
  gender_id: number
  gender_name: string
}
