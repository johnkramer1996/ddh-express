import { IQuery } from '@src/shared/core/cqs/query.interface'
import { FindMemberByLoginServiceResponse } from './service'

export class FindMemberByLoginQuery implements IQuery<FindMemberByLoginServiceResponse> {
  declare response?: FindMemberByLoginServiceResponse
  readonly login: string

  constructor(props: FindMemberByLoginQuery) {
    this.login = props.login
  }
}
