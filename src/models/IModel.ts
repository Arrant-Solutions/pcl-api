import {Type} from 'class-transformer'

export interface IModel {
  created_at?: Date
  updated_at?: Date
}

export abstract class Model implements IModel {
  @Type(() => Date)
  created_at?: Date
  @Type(() => Date)
  updated_at?: Date
}

export interface ICreate<T> {
  // eslint-disable-next-line no-unused-vars
  set assign(create: T)
}
