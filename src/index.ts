/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import {config} from 'dotenv'
config()
import 'reflect-metadata'
import {useExpressServer} from 'routing-controllers'
import * as express from 'express'
import * as compression from 'compression'
import Logger from './config/logger'
import morgan from './middleware/morgan'
import isAuth from './middleware/isAuth'

const app = express()

app.use(morgan)

app.get('/logger', (_, res) => {
  Logger.error('This is an error log')
  Logger.warn('This is a warn log')
  Logger.info('This is a info log')
  Logger.http('This is a http log')
  Logger.debug('This is a debug log')

  res.send('Hello world')
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(compression())
app.use(isAuth)

useExpressServer(app, {
  cors: true,
  routePrefix: `/api/${process.env.API_VERSION}`,
  controllers: [`${__dirname}/controllers/*.ts`],
})

app.listen(process.env.PORT, () => {
  console.debug('starting server.......')
  Logger.debug(`Server running on: http://localhost:${process.env.PORT}`)
  console.debug('started server.......')
})
