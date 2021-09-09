export const database = {
  port: 9000,
  dbURL: process.env.pgConnectionString || '',
  name: process.env.database,
}

export const jwtSecret = process.env.jwtSecret || ''

export const jwtExpiry = process.env.jwtExpiry || '6h'
