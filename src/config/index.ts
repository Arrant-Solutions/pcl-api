import {readFileSync} from 'fs'

export const database = {
  port: 9000,
  dbURL: process.env.pgConnectionString || '',
  name: process.env.database,
}

export const publicKey = readFileSync(
  `${__dirname}/../../keys/private_key.pem`,
  'utf8',
)

export const jwtSecret = process.env.passphrase || ''

export const jwtExpiry = process.env.jwtExpiry || '6h'

export enum Errors {
  // eslint-disable-next-line no-unused-vars
  System = 'Error occured. Unable to process request.',
}

export const {emailRegex} = process.env
