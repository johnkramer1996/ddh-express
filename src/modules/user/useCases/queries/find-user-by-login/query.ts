import { IQuery } from '../../../../../shared/core/cqs/query.interface'
import { FindUserByLoginServiceResponse } from './service'

export class FindUserByLoginQuery implements IQuery<FindUserByLoginServiceResponse> {
  declare response?: FindUserByLoginServiceResponse
  readonly login: string

  constructor(props: FindUserByLoginQuery) {
    this.login = props.login
  }
}
