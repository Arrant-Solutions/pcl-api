export interface IGender {
  gender_id: number
  gender_name: string
}

export class Gender implements IGender {
  gender_id: number
  gender_name: string

  constructor({gender_id, gender_name}: IGender) {
    this.gender_id = gender_id
    this.gender_name = gender_name
  }
}
