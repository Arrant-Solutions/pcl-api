export interface IBranch {
  branch_id: number
  branch_name: string
}

export class Branch implements IBranch {
  branch_id: number
  branch_name: string

  constructor({branch_id, branch_name}) {
    this.branch_id = branch_id
    this.branch_name = branch_name
  }
}
