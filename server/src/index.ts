import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as middlewares from './middlewares'
import * as v1 from './routes/v1'

async function main() {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(logger('dev'))

  app.use(middlewares.SetHeaderMiddleware)

  // Routes
  const router = express.Router()
  const routes = [v1]
  routes.forEach(r => r.factory(router))
  app.use(router)

  // Start Server
  const port = process.env.PORT || 3010
  app.listen(port, () => {
    console.log(`Express started on port ${port}!`)
  })
}

main()
