import { RefreshToken } from '@src/shared/core/jwt'
import { IsString } from 'class-validator'

export class RefreshTokenRequestDto {
  @IsString()
  readonly refreshToken!: RefreshToken
}
