import app from './app'
import {API_VERSION, ENV, PORT} from './config'
import Logger from './config/logger'

app.listen(PORT, () => {
  Logger.debug(
    `API Version: /api/${API_VERSION}\n
    ${__dirname}/controllers/*.${ENV === 'production' ? 'js' : 'ts'}`,
  )
  // Logger.debug(listEndpoints(app))
  Logger.debug(ENV)
  Logger.debug(`Server running on: http://localhost:${PORT}/api/${API_VERSION}`)
})
