import {IModel, Model} from './IModel'

export interface IAuthor extends IModel {
  author_id: number
  title: string
  first_name: string
  last_name: string
  suffix: string
}

export class Author extends Model implements IAuthor {
  author_id: number
  title: string
  first_name: string
  last_name: string
  suffix: string
}
