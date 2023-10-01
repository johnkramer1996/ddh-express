import { RefreshToken } from '@src/modules/user/domain/jwt'
import { IsString } from 'class-validator'

export class RefreshTokenRequestDto {
  @IsString()
  readonly refreshToken!: RefreshToken
}
