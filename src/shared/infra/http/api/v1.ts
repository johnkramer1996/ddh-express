import express, { Router } from 'express'
import { injectable } from 'inversify'
import { BaseController } from '../models/controller.base'
import { container } from '../../di/container'
import { routes } from '../decorators/controller'

@injectable()
class HTTPRouter {
  get(): Router {
    const router = express.Router()

    routes.forEach((i) => {
      const instance = container.get(i.target)
      if (!(instance instanceof BaseController)) return
      router[i.method](i.path, instance.execute.bind(instance))
    })

    return router
  }
}

export default HTTPRouter
