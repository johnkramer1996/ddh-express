import { IQuery } from '@src/shared/core/cqs/query.interface'
import { CurrentUserServiceResponse } from './service'

export class CurrentUserQuery implements IQuery<CurrentUserServiceResponse> {
  declare response?: CurrentUserServiceResponse
  readonly id: string

  constructor(props: CurrentUserQuery) {
    this.id = props.id
  }
}
