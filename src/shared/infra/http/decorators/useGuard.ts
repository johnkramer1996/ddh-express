import { USER_TYPES } from '@src/modules/user/di/types'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { RequestDecoded } from '../models/controller.base'
import { AuthServicePort } from '@src/modules/user/services/auth.service.port'
import { container } from '../../../di/container'
import { getStringFromUnknown } from '@src/shared/utils/get-error'
import { ForbiddenException } from '@src/shared/exceptions/exceptions'

export function UseGuard(func: Function, ...args: any[]): MethodDecorator {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value

    descriptor.value = async function (req: Request, res: Response) {
      const instance = container.get(func as Function)
      if (!(instance instanceof Guard)) return

      await instance.execute(req, ...args)
      return original.apply(this, arguments)
    }
  }
}
export abstract class Guard {
  abstract execute(req: Request, ...args: any[]): Promise<any>
}

@injectable()
export class AuthGuard extends Guard {
  constructor(@inject(USER_TYPES.AUTH_SERVICE) private authService: AuthServicePort) {
    super()
  }

  private getTokenFromRequest(req: Request): string {
    return req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : req.cookies['accessToken'] ? req.cookies['accessToken'] : ''
  }

  public error(message: string): boolean {
    throw new ForbiddenException(message)
  }

  public async execute(req: Request, ensure = true): Promise<boolean> {
    const token = this.getTokenFromRequest(req)
    if (!token) return ensure ? this.error('No access token provided') : true

    try {
      const decoded = await this.authService.decodeJWT(token)
      const tokens = await this.authService.getTokens(decoded.email)

      if (tokens.length === 0) {
        return ensure ? this.error('Auth token not found. User is probably not logged in. Please login again.') : true
      }

      ;(req as RequestDecoded).decoded = decoded
      return true
    } catch (e) {
      return this.error('Token signature expired.')
    }
  }

  //   public static restrictedUrl(req: Request, res: Response, next: NextFunction) {
  //     if (!envCongig.isProduction) {
  //       return next()
  //     }

  //     const approvedDomainList = ['https://khalilstemmler.com']
  //     const domain = req.headers.origin
  //     const isValidDomain = !!approvedDomainList.find((d) => d === domain)
  //     console.log(`Domain =${domain}, valid?=${isValidDomain}`)

  //     return isValidDomain ? next() : res.status(403).json({ message: 'Unauthorized' })
  //   }
}
