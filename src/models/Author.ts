import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface IAuthor extends IModel {
  author_id: number
  title: string
  first_name: string
  last_name: string
  suffix: string
}

export class Author extends Model implements IAuthor, ICreate<IAuthor> {
  @IsOptional()
  @IsPositive()
  @IsInt()
  author_id: number

  @IsString()
  @MaxLength(255)
  title: string

  @IsString()
  @MaxLength(100)
  first_name: string

  @IsString()
  @MaxLength(100)
  last_name: string

  @IsString()
  @MaxLength(255)
  suffix: string

  set assign({author_id, title, first_name, last_name, suffix}: IAuthor) {
    this.author_id = author_id
    this.title = title
    this.first_name = first_name
    this.last_name = last_name
    this.suffix = suffix
  }
}
