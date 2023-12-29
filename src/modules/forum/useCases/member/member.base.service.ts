import { inject } from 'inversify'
import { ServiceBase } from '@src/shared/core/service.base'
import { MemberRepositoryPort } from '../../repository/member/member.repository.port'
import { MEMBER_TYPES } from '../../di/member/member.types'
import { MemberSequelizeRepositoryQuery } from '../../repository/member/member.repository.query.sequelize'

export abstract class MemberServiceBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(@inject(MEMBER_TYPES.REPOSITORY) protected memberRepo: MemberRepositoryPort) {
    super()
  }
}

export abstract class MemberServiceQueryBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(@inject(MEMBER_TYPES.QUERY_REPOSITORY) protected memberRepo: MemberSequelizeRepositoryQuery) {
    super()
  }
}
