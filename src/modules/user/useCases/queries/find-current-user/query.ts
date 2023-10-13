import { IQuery } from '@src/shared/core/cqs/query.interface'
import { CurrentUserServiceResponse } from './service'

export class CurrentUserQuery implements IQuery<CurrentUserServiceResponse> {
  declare response?: CurrentUserServiceResponse
  readonly userId: string

  constructor(props: CurrentUserQuery) {
    this.userId = props.userId
  }
}
