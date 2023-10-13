import { inject } from 'inversify'
import { ServiceBase } from '@src/shared/core/service.base'
import { MemberRepositoryPort } from '../../repository/member/repository.port'
import { MEMBER_TYPES } from '../../di/member/types'

export abstract class MemberServiceBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(@inject(MEMBER_TYPES.REPOSITORY) protected memberRepo: MemberRepositoryPort) {
    super()
  }
}
