import {IsInt, IsOptional, IsPositive, IsString, Max} from 'class-validator'
import {ICreate, IModel, Model} from './IModel'

export interface ICountry extends IModel {
  country_id: number
  country_name: string
  country_abbr: string
  country_code: string
}

export class Country extends Model implements ICountry, ICreate<ICountry> {
  @IsOptional()
  @IsInt()
  @IsPositive()
  country_id: number

  @IsString()
  @Max(60)
  country_name: string

  @IsString()
  @Max(10)
  country_abbr: string

  @IsString()
  @Max(10)
  country_code: string

  set assign({country_id, country_name, country_abbr, country_code}: ICountry) {
    this.country_id = country_id
    this.country_name = country_name
    this.country_abbr = country_abbr
    this.country_code = country_code
  }
}
