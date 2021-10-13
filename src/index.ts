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
import {API_VERSION, PORT} from './config'

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
  controllers: [`${__dirname}/controllers/*.ts`],
})

app.use((req: express.Request, res: express.Response) => {
  console.log('terminating not found the route')

  return res.status(404).json({
    statusCode: 404,
    data: 'Request not found',
    code: API_VERSION,
  })
})

// eslint-disable-next-line no-underscore-dangle
app._router.stack // registered routes
  .filter(r => r.route) // take out all the middleware
  .map(r => {
    console.debug(r.route.path)
    return r.route.path
  }) // get all the paths

app.listen(PORT, () => {
  console.debug('starting server.......')
  Logger.debug(`Server running on: http://localhost:${PORT}`)
  console.debug(`/api/${API_VERSION}`)
})
