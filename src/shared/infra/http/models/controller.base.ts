import { envCongig } from '@src/configs/config'
import { getStringFromUnknown } from '@src/shared/utils/get-error'
import * as express from 'express'
import { injectable } from 'inversify'

@injectable()
export abstract class BaseController {
  protected abstract executeImpl(req: express.Request, res: express.Response): Promise<void | any>

  public async execute(req: express.Request, res: express.Response): Promise<void> {
    try {
      return await this.executeImpl(req, res)
    } catch (err) {
      if (envCongig.isDevelopment) {
        console.log(`[BaseController]: Uncaught controller error`)
        console.log(err)
      }
      this.fail(res, 'An unexpected error occurred')
    }
  }

  public static jsonResponse(res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public static dtoResponse<T extends object>(res: express.Response, code: number, dto?: T) {
    if (!dto) return res.sendStatus(code)
    return res.status(code).json(dto)
  }

  public ok<T extends object>(res: express.Response, dto?: T) {
    return BaseController.dtoResponse(res, 200, dto)
  }

  public created<T extends object>(res: express.Response, dto?: T) {
    return BaseController.dtoResponse(res, 201, dto)
  }

  public clientError(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized')
  }

  public unauthorized(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized')
  }

  public paymentRequired(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : 'Payment required')
  }

  public forbidden(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden')
  }

  public notFound(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found')
  }

  public conflict(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict')
  }

  public tooMany(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests')
  }

  public todo(res: express.Response) {
    return BaseController.jsonResponse(res, 400, 'TODO')
  }

  public fail(res: express.Response, error: Error | string) {
    if (envCongig.isDevelopment) console.log(error)
    return res.status(500).json({ message: getStringFromUnknown(error) })
  }
}
