export interface JWTClaims {
  id: string
  email: string
  login: string
  // username: string | null
  // isEmailVerified: boolean
  // adminUser: boolean
}

export type JWTToken = string

export type SessionId = string

export type RefreshToken = string
