import {Type} from 'class-transformer'

export interface IModel {
  created_at: Date
  updated_at: Date
}

export abstract class Model implements IModel {
  @Type(() => Date)
  created_at: Date
  @Type(() => Date)
  updated_at: Date
}
