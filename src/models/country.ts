import {IModel, Model} from './IModel'

export interface ICountry extends IModel {
  country_id: number
  country_name: string
  country_abbr: string
}

export class Country extends Model implements ICountry {
  country_id: number
  country_name: string
  country_abbr: string
}
