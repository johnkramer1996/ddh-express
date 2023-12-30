import { JWTToken, RefreshToken } from '@src/shared/core/jwt'

export class UserTokensResponseDto {
  accessToken: JWTToken
  refreshToken: RefreshToken

  constructor(props: UserTokensResponseDto) {
    this.accessToken = props.accessToken
    this.refreshToken = props.refreshToken
  }
}
