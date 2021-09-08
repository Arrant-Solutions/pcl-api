export const database = {
  port: 9000,
  dbURL: process.env.pgConnectionString || '',
}

export default {database}
