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

useExpressServer(app, {
  cors: true,
  routePrefix: '/api/v1.0',
  controllers: [`${__dirname}/controllers/*.ts`],
})

app.listen(process.env.PORT, () =>
  Logger.debug(`Server running on: http://localhost:${process.env.PORT}`),
)
