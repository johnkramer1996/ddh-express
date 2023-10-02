import { envCongig } from '@src/configs/config'
import { USER_TYPES } from '@src/modules/user/infra/di/types'
import { AuthServicePort } from '@src/modules/user/services/auth.service.port'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { RequestDecoded } from '../models/controller.base'

@injectable()
export class aaa {
  constructor(@inject(USER_TYPES.AUTH_SERVICE) private authService: AuthServicePort) {}

  public log(req: Request, res: Response, next: NextFunction) {
    const { url, method, body, headers } = req
    console.log('[LOG]', { url, method, body, headers })
    next()
  }

  private endRequest(status: 400 | 401 | 403, message: string, res: any): any {
    return res.status(status).send({ message })
  }

  private getTokenFromRequest(req: Request): string {
    return req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : req.cookies['accessToken'] ? req.cookies['accessToken'] : ''
  }

  public authenticated(ensure: true) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = this.getTokenFromRequest(req)
      if (!token) return ensure ? this.endRequest(403, 'No access token provided', res) : next()

      try {
        console.log(token)
        const decoded = await this.authService.decodeJWT(token)
        const tokens = await this.authService.getTokens(decoded.email)

        if (tokens.length === 0) {
          return ensure ? this.endRequest(403, 'Auth token not found. User is probably not logged in. Please login again.', res) : next()
        }

        ;(req as RequestDecoded).decoded = decoded
        return next()
      } catch (e) {
        return this.endRequest(403, 'Token signature expired.', res)
      }
    }
  }

  public static restrictedUrl(req: Request, res: Response, next: NextFunction) {
    if (!envCongig.isProduction) {
      return next()
    }

    const approvedDomainList = ['https://khalilstemmler.com']
    const domain = req.headers.origin
    const isValidDomain = !!approvedDomainList.find((d) => d === domain)
    console.log(`Domain =${domain}, valid?=${isValidDomain}`)

    return isValidDomain ? next() : res.status(403).json({ message: 'Unauthorized' })
  }
}
