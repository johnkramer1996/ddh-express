import { IQuery } from '../../../../../shared/core/cqs/query.interface'
import { FindUserServiceResponse } from './find-user.service'

export class FindUserQuery implements IQuery<FindUserServiceResponse> {
  declare response?: FindUserServiceResponse
  readonly userId: string

  constructor(props: FindUserQuery) {
    this.userId = props.userId
  }
}
