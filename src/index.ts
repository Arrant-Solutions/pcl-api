/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import {config} from 'dotenv'
config()
import 'reflect-metadata'
import {useExpressServer} from 'routing-controllers'
import * as express from 'express'

const app = express()

useExpressServer(app, {
  cors: true,
  routePrefix: '/api/v1.0',
  controllers: [`${__dirname}/controllers/*.ts`],
})
app.listen(3000)
