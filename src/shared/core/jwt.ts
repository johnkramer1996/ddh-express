export interface JWTClaims {
  id: string
  email: string
  login: string
  // TODO:
  // isEmailVerified: boolean
}

export type JWTToken = string

export type SessionId = string

export type RefreshToken = string
