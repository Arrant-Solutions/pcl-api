/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import {config} from 'dotenv'
config()
import 'reflect-metadata'
import {useExpressServer} from 'routing-controllers'
import * as express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

useExpressServer(app, {
  cors: true,
  routePrefix: '/api/v1.0',
  controllers: [`${__dirname}/controllers/*.ts`],
})
app.listen(process.env.PORT, () =>
  console.log(`Server running on: http://localhost:${process.env.PORT}`),
)
