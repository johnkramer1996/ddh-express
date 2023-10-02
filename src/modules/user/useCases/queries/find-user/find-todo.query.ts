import { IQuery } from '../../../../../shared/core/cqs/query.interface'
import { FindUserServiceResponse } from './find-todo.service'

export class FindUserQuery implements IQuery<FindUserServiceResponse> {
  readonly userId: string

  constructor(props: FindUserQuery) {
    this.userId = props.userId
  }
}
