import {IModel, Model} from './IModel'

export interface IBranch extends IModel {
  branch_id: number
  branch_name: string
}

export class Branch extends Model implements IBranch {
  branch_id: number
  branch_name: string
}
