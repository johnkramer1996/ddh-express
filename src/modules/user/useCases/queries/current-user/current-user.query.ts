import { IQuery } from '@src/shared/core/cqs/query.interface'
import { CurrentUserServiceResponse } from './find-users.service'

export class CurrentUserQuery implements IQuery<CurrentUserServiceResponse> {
  readonly id: string

  constructor(props: CurrentUserQuery) {
    this.id = props.id
  }
}
