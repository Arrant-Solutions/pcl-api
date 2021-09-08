export interface ICountry {
  country_id: number
  country_name: string
  country_abbr: string
}

export class Country implements ICountry {
  country_id: number
  country_name: string
  country_abbr: string

  constructor({country_id, country_name, country_abbr}) {
    this.country_id = country_id
    this.country_name = country_name
    this.country_abbr = country_abbr
  }
}
