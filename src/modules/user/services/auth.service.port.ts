import { JWTClaims, JWTToken, RefreshToken } from '../domain/jwt'
import { UserEntity } from '../domain/user.entity'

export interface AuthServicePort {
  connect(): Promise<void>
  signJWT(props: JWTClaims): JWTToken
  decodeJWT(token: string): Promise<JWTClaims>
  createRefreshToken(): RefreshToken
  getTokens(username: string): Promise<string[]>
  saveAuthenticatedUser(userEmail: string, accessToken: string, refreshToken: RefreshToken): Promise<void>
  deAuthenticateUser(username: string): Promise<void>
  refreshTokenExists(refreshToken: RefreshToken): Promise<boolean>
  getEmailFromRefreshToken(refreshToken: RefreshToken): Promise<string>
}
