import { JWTClaims, JWTToken, RefreshToken } from '../../../shared/core/jwt'
import { UserEntity } from '../domain/user.entity'

export interface AuthServicePort {
  connect(): Promise<void>
  signJWT(user: UserEntity): JWTToken
  decodeJWT(token: string): Promise<JWTClaims>
  createRefreshToken(): RefreshToken
  getTokens(username: string): Promise<string[]>
  saveAuthenticatedUser(user: UserEntity): Promise<void>
  deAuthenticateUser(user: UserEntity): Promise<void>
  refreshTokenExists(refreshToken: RefreshToken): Promise<boolean>
  getLoginFromRefreshToken(refreshToken: RefreshToken): Promise<string>
}
