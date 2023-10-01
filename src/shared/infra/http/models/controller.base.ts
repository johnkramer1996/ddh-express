import { envCongig } from '@src/configs/config'
import { JWTClaims } from '@src/modules/user/domain/jwt'
import { getStringFromUnknown } from '@src/shared/utils/get-error'
import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../di/types'
import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { Mapper } from '@src/shared/domain/mapper.interface'
import { Entity } from '@src/shared/domain/entity'
import { ObjectLiteral } from '@src/shared/types/object-literal.type'

export interface RequestDecoded extends Request {
  decoded: JWTClaims
}

@injectable()
export abstract class BaseController {
  constructor(protected queryBus: IQueryBus, protected commandBus: ICommandBus, protected mapper: Mapper<Entity<any>, ObjectLiteral>) {}

  protected abstract executeImpl(req: RequestDecoded, res: Response): Promise<void | any>

  public async execute(req: Request, res: Response): Promise<void> {
    try {
      return await this.executeImpl(req as RequestDecoded, res)
    } catch (err) {
      if (envCongig.isDevelopment) {
        console.log(`[BaseController]: Uncaught controller error`)
        console.log(err)
      }
      this.fail(res, 'An unexpected error occurred')
    }
  }

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public static dtoResponse<T extends object>(res: Response, code: number, dto?: T) {
    if (!dto) return res.sendStatus(code)
    return res.status(code).json(dto)
  }

  public ok<T extends object>(res: Response, dto?: T) {
    return BaseController.dtoResponse(res, 200, dto)
  }

  public created<T extends object>(res: Response, dto?: T) {
    return BaseController.dtoResponse(res, 201, dto)
  }

  public clientError(res: Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized')
  }

  public unauthorized(res: Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized')
  }

  public paymentRequired(res: Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : 'Payment required')
  }

  public forbidden(res: Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden')
  }

  public notFound(res: Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found')
  }

  public conflict(res: Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict')
  }

  public tooMany(res: Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests')
  }

  public todo(res: Response) {
    return BaseController.jsonResponse(res, 400, 'TODO')
  }

  public fail(res: Response, error: Error | string) {
    if (envCongig.isDevelopment) console.log(error)
    return res.status(500).json({ message: getStringFromUnknown(error) })
  }
}
