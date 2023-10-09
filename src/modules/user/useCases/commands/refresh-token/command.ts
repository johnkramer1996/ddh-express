import { ICommand } from '@src/shared/core/cqs/command.interface'
import { RefreshTokenServiceResponse } from './service'
import { RefreshToken } from '@src/shared/core/jwt'

export class RefreshTokenCommand implements ICommand<RefreshTokenServiceResponse> {
  declare response?: RefreshTokenServiceResponse
  readonly refreshToken: RefreshToken

  constructor(props: RefreshTokenCommand) {
    this.refreshToken = props.refreshToken
  }
}
