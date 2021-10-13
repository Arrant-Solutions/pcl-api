import {readFileSync} from 'fs'

export const database = {
  port: 9000,
  dbURL:
    process.env.pgConnectionString ||
    'pgConnectionString=postgres://nctdoqvbfwdsfo:ce79098213f552d87731f23befe05e26867a519c1cad671b849f81f7723c996d@ec2-54-90-211-192.compute-1.amazonaws.com:5432/dd8hk4b1uh70sh',
  name: process.env.database || 'dd8hk4b1uh70sh',
}

export const PORT = process.env.PORT || 9000

export const privateKey = readFileSync(
  `${__dirname}/../keys/private-key.pem`,
  'utf8',
)

export const publicKey = readFileSync(
  `${__dirname}/../keys/public-key.pem`,
  'utf8',
)

export const jwtSecret =
  process.env.passphrase ||
  'g4+[!(G]NNK_akGkEj/)8gPJy*g);fDfY=kh~`fq/NgQk`>9)3^MVBaEUQt~`y-'

export const jwtExpiry = process.env.jwtExpiry || '90d'

export enum Errors {
  // eslint-disable-next-line no-unused-vars
  System = 'Error occured. Unable to process request.',
}

export const emailRegex =
  process.env.emailRegex ||
  '^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$'

export const API_VERSION = process.env.API_VERSION || 'v1.0'

export const ENV = process.env.ENV || 'production'
