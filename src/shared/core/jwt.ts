export interface JWTClaims {
  id: string
  email: string
  login: string
  permissions: UserPermission[]
  isAdmin: boolean
  // TODO:
  // isEmailVerified: boolean
}

export type JWTToken = string

export type SessionId = string

export type RefreshToken = string

export type UserPermission = 'admin' | 'member'
