import express, { Application, Request, Response, Router } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../di/types'
import HTTPRouter from './api/v1'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import fileUpload from 'express-fileupload'
import { v1 } from '@src/configs/routes'

export interface IServer {
  create(baseUrl?: string): Application
}

@injectable()
class Server {
  constructor(@inject(TYPES.HTTP_ROUTER) private _router: HTTPRouter) {}

  public create(baseUrl = `/api/${v1}`): Application {
    const app = express()

    app.use(cors({ credentials: true, origin: ['http://localhost:8088'] }))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(express.static(path.resolve((global as any).__basedir, 'static')))
    app.use(fileUpload({}))
    app.use(cookieParser())
    app.use(morgan('combined'))

    app.get('/', (req, res) => {
      return res.json({ message: 'Server is running' })
    })

    app.use(baseUrl, this._router.get())

    app.use((req: Request, res: Response) => {
      res.status(404).json({ message: 'Page not found' })
    })

    return app
  }
}

export default Server
