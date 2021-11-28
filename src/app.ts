/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import 'reflect-metadata'
import {config} from 'dotenv'
config()
import {
  Action,
  createExpressServer,
  // useExpressServer,
} from 'routing-controllers'
import * as express from 'express'
import * as compression from 'compression'
// import listEndpoints from 'express-list-endpoints'
import Logger from './config/logger'
import morgan from './middleware/morgan'
// import isAuth from './middleware/isAuth'
import {API_VERSION, ENV} from './config'
import ErrorHandlerMiddleware from './middleware/ErrorHandlerMiddleware'
import {authService} from './loaders/services'
// import {TokenValidationMiddleware} from './middleware/TokenValidationMiddleware'
// import {authService} from './loaders/services'

const app = createExpressServer({
  authorizationChecker: async (action: Action, roles: string[]) => {
    const regexp = new RegExp(
      `^(health|/api/${API_VERSION}/(assets|auth/(register|refreshToken|fetchUser(.*)))(/)?(.*))`,
    )

    if (regexp.test(action.request.url)) {
      return true
    }

    const header = action.request.headers.authorization
    const user = await authService.findUserByToken(header)
    if (!user) {
      return false
    }
    if (user && !roles.length) {
      // eslint-disable-next-line no-param-reassign
      action.request.user = user
      return true
    }
    if (user && roles.find(role => role === user.user_group.user_group_name)) {
      // eslint-disable-next-line no-param-reassign
      action.request.user = user
      return true
    }
    return false
    // console.log(action.request.url, roles)
    // return true
  },
  currentUserChecker: (action: Action) => action.request.user,
  cors: true,
  routePrefix: `/api/${API_VERSION}`,
  defaultErrorHandler: false,
  controllers: [
    `${__dirname}/controllers/*.${ENV === 'production' ? 'js' : 'ts'}`,
  ],
  interceptors: [
    // `${__dirname}/interceptors/*.${ENV === 'production' ? 'js' : 'ts'}`,
  ],
  middlewares: [
    // `${__dirname}/handlers/*.${ENV === 'production' ? 'js' : 'ts'}`,
    // TokenValidationMiddleware,
    ErrorHandlerMiddleware,
  ],
})

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
// app.use(isAuth)

app.use('/health', (req: express.Request, res: express.Response) =>
  res.send(
    `<html>
    <head><title>API Health</title></head>
    <body>
      <p style="color: green; font-size: 1.8rem; padding: 20px;">
      Healthy<br/>Version: ${process.env.UPDATE_CODE}
      </p>
      </body>
      </html>`,
  ),
)

export default app
