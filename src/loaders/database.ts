import {Pool, Client} from 'pg'
import {database} from '../config'

const connectionString = database.dbURL
export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

export const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

pool.connect()
