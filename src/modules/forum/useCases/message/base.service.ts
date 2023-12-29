import { inject } from 'inversify'
import { ServiceBase } from '@src/shared/core/service.base'
import { MemberRepositoryPort } from '../../repository/member/member.repository.port'
import { MEMBER_TYPES } from '../../di/member/member.types'
import { PostSequelizeRepositoryQuery } from '../../repository/post/post.repository.query.sequelize'
import { MemberSequelizeRepositoryQuery } from '../../repository/member/member.repository.query.sequelize'
import { MESSAGE_TYPES } from '../../di/message/message.types'
import { MessageRepositoryPort } from '../../repository/message/message.repository.port'
import { MessageSequelizeRepositoryQuery } from '../../repository/message/message.repository.query.sequelize'
import { MessageQueryMapper } from '../../mappers/message/message.mapper-query'
import { MessageService } from '../../domain/service/message.service'

export abstract class MessageServiceBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(
    @inject(MESSAGE_TYPES.REPOSITORY) protected messageRepo: MessageRepositoryPort,
    @inject(MEMBER_TYPES.REPOSITORY) protected memberRepo: MemberRepositoryPort,
    @inject(MessageService) protected messageService: MessageService
  ) {
    super()
  }
}

export abstract class MessageServiceQueryBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(
    @inject(MESSAGE_TYPES.QUERY_REPOSITORY) protected messageRepo: MessageSequelizeRepositoryQuery,
    @inject(MEMBER_TYPES.QUERY_REPOSITORY) protected memberRepo: MemberSequelizeRepositoryQuery,
    @inject(MESSAGE_TYPES.QUERY_MAPPER) protected messageMapper: MessageQueryMapper
  ) {
    super()
  }
}
