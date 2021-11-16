import {Pool, Client} from 'pg'
import * as pgPromise from 'pg-promise'
import {database} from '../config'

const pgp = pgPromise({
  schema: process.env.ENV === 'production' ? ['public'] : ['staging'],
})

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

export const db = pgp({
  connectionString,
  max: 30,
  ssl: {
    rejectUnauthorized: false,
  },
})
