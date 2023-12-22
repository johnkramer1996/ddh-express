import { envCongig } from '@src/configs/config'
import { JWTClaims } from '@src/shared/core/jwt'
import { getStringFromUnknown } from '@src/shared/utils/get-error'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../../di/types'
import { ICommandBus } from '@src/shared/core/cqs/command-bus'
import { IQueryBus } from '@src/shared/core/cqs/query-bus'
import { Mapper } from '@src/shared/domain/mapper.interface'
import { Entity } from '@src/shared/domain/entity'
import { ObjectLiteral } from '@src/shared/types/object-literal.type'
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@src/shared/exceptions/exceptions'
import { ExceptionBase } from '@src/shared/exceptions/exception.base'

export interface RequestDecoded extends Request {
  decoded: JWTClaims
}

export interface RequestDecodedIfExist extends Request {
  decoded?: JWTClaims
}

@injectable()
export abstract class BaseController {
  constructor(protected queryBus: IQueryBus, protected commandBus: ICommandBus) {}

  protected abstract executeImpl(req: RequestDecoded, res: Response, next: NextFunction): Promise<void | any>

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      return await this.executeImpl(req as RequestDecoded, res, next)
    } catch (err) {
      console.log(err)
      if (err instanceof ExceptionBase) {
        this.handleError(res, err)
        return
      }
      if (envCongig.isDevelopment) {
        console.log(`[BaseController]: Uncaught controller error`)
        console.log(err)
      }

      this.fail(res, 'An unexpected error occurred')
    }
  }

  protected handleError(res: Response, error: Error) {
    if (error instanceof ArgumentInvalidException) return this.clientError(res, error)
    if (error instanceof ArgumentOutOfRangeException) return this.clientError(res, error)
    if (error instanceof ArgumentNotProvidedException) return this.clientError(res, error)
    if (error instanceof ConflictException) return this.conflict(res, error)
    if (error instanceof NotFoundException) return this.notFound(res, error)
    if (error instanceof ForbiddenException) return this.forbidden(res, error)
    if (error instanceof UnauthorizedException) return this.unauthorized(res, error)
    if (error instanceof InternalServerErrorException) return this.fail(res, error)
    return this.fail(res, error.message)
  }

  public static jsonResponse(res: Response, code: number, error: string | ExceptionBase) {
    return res.status(code).json(error instanceof ExceptionBase ? error.toJSON() : { message: error })
  }

  public static dtoResponse<T extends object>(res: Response, code: number, dto?: T) {
    if (!dto) return res.status(code).json({ message: 'ok' })
    return res.status(code).json(dto)
  }

  public ok<T extends object>(res: Response, dto?: T) {
    return BaseController.dtoResponse(res, 200, dto)
  }

  public created<T extends object>(res: Response, dto?: T) {
    return BaseController.dtoResponse(res, 201, dto)
  }

  public clientError(res: Response, error?: ExceptionBase) {
    return BaseController.jsonResponse(res, 400, error ? error : 'Client error')
  }

  public unauthorized(res: Response, error?: ExceptionBase) {
    return BaseController.jsonResponse(res, 401, error ? error : 'Unauthorized')
  }

  public paymentRequired(res: Response, error?: ExceptionBase) {
    return BaseController.jsonResponse(res, 402, error ? error : 'Payment required')
  }

  public forbidden(res: Response, error?: ExceptionBase) {
    return BaseController.jsonResponse(res, 403, error ? error : 'Forbidden')
  }

  public notFound(res: Response, error?: ExceptionBase) {
    return BaseController.jsonResponse(res, 404, error ? error : 'Not found')
  }

  public conflict(res: Response, error?: ExceptionBase) {
    return BaseController.jsonResponse(res, 409, error ? error : 'Conflict')
  }

  public tooMany(res: Response, error?: ExceptionBase) {
    return BaseController.jsonResponse(res, 429, error ? error : 'Too many requests')
  }

  public fail(res: Response, error: Error | string) {
    if (envCongig.isDevelopment) console.log(error)
    return BaseController.jsonResponse(res, 500, getStringFromUnknown(error))
  }
}
