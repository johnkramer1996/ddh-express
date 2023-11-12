import express, { Application, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../di/types'
import HTTPRouter from './api/v1'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

export interface IServer {
  create(baseUrl?: string): Application
}

@injectable()
class Server {
  constructor(@inject(TYPES.HTTP_ROUTER) private _router: HTTPRouter) {}

  public create(baseUrl = '/api/v1'): Application {
    const app = express()

    app.use(express.json())
    // app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors({ credentials: true, origin: ['http://localhost:8088', 'http://localhost:3001'] }))
    // app.use(cors({ origin: 'http://localhost:3000' }))
    // app.use(compression())
    // app.use(helmet())
    app.use(cookieParser())
    app.use(morgan('combined'))

    app.get('/', (req, res) => {
      return res.json({ message: 'Server is running' })
    })

    app.use(baseUrl, this._router.get())

    return app
  }
}

export default Server
