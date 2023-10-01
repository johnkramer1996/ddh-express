import { ICommand } from '@src/shared/core/cqs/command.interface'
import { RefreshTokenServiceResponse } from './refresh-token.service'
import { RefreshToken } from '@src/modules/user/domain/jwt'

export class RefreshTokenCommand implements ICommand<RefreshTokenServiceResponse> {
  readonly refreshToken: RefreshToken

  constructor(props: RefreshTokenCommand) {
    this.refreshToken = props.refreshToken
  }
}
