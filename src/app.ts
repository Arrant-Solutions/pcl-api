/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import {config} from 'dotenv'
config()
import 'reflect-metadata'
import {useExpressServer} from 'routing-controllers'
import * as express from 'express'
import * as compression from 'compression'
// import listEndpoints from 'express-list-endpoints'
import Logger from './config/logger'
import morgan from './middleware/morgan'
import isAuth from './middleware/isAuth'
import {API_VERSION, ENV} from './config'

const app = express()

app.use(morgan)

app.get('/logger', (_, res) => {
  Logger.error('This is an error log')
  Logger.warn('This is a warn log')
  Logger.info('This is a info log')
  Logger.http('This is a http log')
  Logger.debug(`/api/${API_VERSION}`)

  res.send('Hello world')
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(compression())
app.use(isAuth)

useExpressServer(app, {
  cors: true,
  routePrefix: `/api/${API_VERSION}`,
  controllers: [
    `${__dirname}/controllers/*.${ENV === 'production' ? 'js' : 'ts'}`,
  ],
  middlewares: [
    `${__dirname}/handlers/*.${ENV === 'production' ? 'js' : 'ts'}`,
  ],
})

app.use('/health', (req: express.Request, res: express.Response) =>
  res.send(
    '<html><head></head><body><p style="color: green; font-size: 1.8rem; padding: 20px;">Healthy</p></body></html>',
  ),
)

export default app
