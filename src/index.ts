/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import {config} from 'dotenv'
config()
import 'reflect-metadata'
import {useExpressServer} from 'routing-controllers'
import * as express from 'express'
import BranchController from './controllers/BranchController'

const app = express() // your created express server
// app.use() // you can configure it the way you want
useExpressServer(app, {
  // register created express server in routing-controllers
  controllers: [BranchController], // and configure it the way you need (controllers, validation, etc.)
})
app.listen(3000) // run your express server
