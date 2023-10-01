import { JWTToken, RefreshToken } from '@src/modules/user/domain/jwt'

export class UserTokensResponseDto {
  accessToken: JWTToken
  refreshToken: RefreshToken

  constructor(props: UserTokensResponseDto) {
    this.accessToken = props.accessToken
    this.refreshToken = props.refreshToken
  }
}
