import { v4 } from 'uuid'
import { JWTClaims, JWTToken, RefreshToken } from '../../../shared/core/jwt'
import { AuthServicePort } from './auth.service.port'
import { AbstractRedisClient } from './redis/redis-client.base'
import jwt from 'jsonwebtoken'
import { authConfig } from '@src/configs/config'
import { injectable } from 'inversify'

@injectable()
export class RedisAuthService extends AbstractRedisClient implements AuthServicePort {
  private tokenExpiryTime = authConfig.tokenExpiryTime
  public jwtHashName = 'activeJwtClients'

  public async refreshTokenExists(refreshToken: RefreshToken): Promise<boolean> {
    const keys = await this.getAllKeys(`*${refreshToken}*`)
    return keys.length !== 0
  }

  public async getEmailFromRefreshToken(refreshToken: RefreshToken): Promise<string> {
    const keys = await this.getAllKeys(`*${refreshToken}*`)
    const exists = keys.length !== 0
    if (!exists) throw new Error('Email not found for refresh token.')

    const key = keys[0]
    return key.substring(key.indexOf(this.jwtHashName) + this.jwtHashName.length + 1)
  }

  public async saveAuthenticatedUser(email: string, accessToken: string, refreshToken: RefreshToken): Promise<void> {
    await this.addToken(email, refreshToken, accessToken)
  }

  public async deAuthenticateUser(username: string): Promise<void> {
    await this.clearAllSessions(username)
  }

  public createRefreshToken(): RefreshToken {
    return v4()
  }

  public signJWT(props: JWTClaims): JWTToken {
    const claims: JWTClaims = {
      id: props.id,
      email: props.email,
    }

    return jwt.sign(claims, authConfig.secret, {
      expiresIn: this.tokenExpiryTime,
    })
  }

  public async decodeJWT(token: string): Promise<JWTClaims> {
    const decoded = jwt.verify(token, authConfig.secret)
    return decoded as JWTClaims
  }

  private constructKey(email: string, refreshToken: RefreshToken): string {
    return `refresh-${refreshToken}.${this.jwtHashName}.${email}`
  }

  public addToken(email: string, refreshToken: RefreshToken, token: JWTToken): Promise<any> {
    return this.set(this.constructKey(email, refreshToken), token)
  }

  public async clearAllTokens(): Promise<any> {
    const allKeys = await this.getAllKeys(`*${this.jwtHashName}*`)
    return Promise.all(allKeys.map((key) => this.deleteOne(key)))
  }

  public countSessions(username: string): Promise<number> {
    return this.count(`*${this.jwtHashName}.${username}`)
  }

  public countTokens(): Promise<number> {
    return this.count(`*${this.jwtHashName}*`)
  }

  public async getTokens(username: string): Promise<string[]> {
    const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${username}`)
    return keyValues.map((kv) => kv.value)
  }

  public async getToken(username: string, refreshToken: string): Promise<string | null> {
    return this.getOne(this.constructKey(username, refreshToken))
  }

  public async clearToken(username: string, refreshToken: string): Promise<any> {
    return this.deleteOne(this.constructKey(username, refreshToken))
  }

  public async clearAllSessions(username: string): Promise<any> {
    const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${username}`)
    const keys = keyValues.map((kv) => kv.key)
    return Promise.all(keys.map((key) => this.deleteOne(key)))
  }

  public async sessionExists(username: string, refreshToken: string): Promise<boolean> {
    const token = await this.getToken(username, refreshToken)

    return Boolean(token)
  }
}
