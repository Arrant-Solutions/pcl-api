// import {readFileSync} from 'fs'

export const database = {
  port: 9000,
  dbURL: process.env.DATABASE_URL,
  name: process.env.DATABASE_NAME,
}

export const PORT = process.env.PORT || 9000

// export const privateKey = readFileSync(
//   `${__dirname}/../keys/private-key.pem`,
//   'utf8',
// )

// export const publicKey = readFileSync(
//   `${__dirname}/../keys/public-key.pem`,
//   'utf8',
// )

export const {PRIVATE_KEY, PUBLIC_KEY, JWT_SECRET, JWT_EXPIRY} = process.env

// export const jwtSecret = process.env.passphrase

// export const jwtExpiry = process.env.jwtExpiry || '90d'

export enum Errors {
  // eslint-disable-next-line no-unused-vars
  System = 'Error occured. Unable to process request.',
}

export const emailRegex =
  '^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$'

export const API_VERSION = process.env.API_VERSION || 'v1.0'

export const ENV = process.env.ENV || 'production'
