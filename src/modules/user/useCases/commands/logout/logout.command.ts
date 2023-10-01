import { ICommand } from '@src/shared/core/cqs/command.interface'
import { LogoutServiceResponse } from './logout.service'

export class LogoutCommand implements ICommand<LogoutServiceResponse> {
  readonly id: string

  constructor(props: LogoutCommand) {
    this.id = props.id
  }
}
