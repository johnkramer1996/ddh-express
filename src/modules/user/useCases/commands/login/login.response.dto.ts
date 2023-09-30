import { JWTToken, RefreshToken } from '@src/modules/user/domain/jwt'

export class LoginResponseDto {
  accessToken: JWTToken
  refreshToken: RefreshToken

  constructor(props: LoginResponseDto) {
    this.accessToken = props.accessToken
    this.refreshToken = props.refreshToken
  }
}
