import { Container } from 'inversify'
import { MEMBER_TYPES } from './types'
import { FindCurrentMemberController } from '../../useCases/member/queries/find-current-member/controller'
import { FindMemberByLoginController } from '../../useCases/member/queries/find-member-by-login/controller'
import { FindMemberLoginService } from '../../useCases/member/queries/find-member-by-login/service'
import { MemberRepositoryPort } from '../../repository/member/repository.port'
import MemberModel from '@src/shared/infra/database/sequelize/models/member.model'
import { MemberSequelizeRepository, MemberSequelizeRepositoryQuery } from '../../repository/member/repository.sequelize'
import { MemberMapper } from '../../mappers/member/mapper-domain'
import { CreateMemberWhenUserIsCreatedDomainEventHandler } from '../../application/event-handlers/create-member-when-is-created.domain-event-handler'
import { BanMemberController } from '../../useCases/member/commands/ban-member/controller'
import { BanMemberService } from '../../useCases/member/commands/ban-member/service'
import { MemberQueryMapper } from '../../mappers/member/mapper-query'

const MemberModule = (container: Container) => {
  container.bind(MEMBER_TYPES.MAPPER).to(MemberMapper)
  container.bind(MEMBER_TYPES.QUERY_MAPPER).to(MemberQueryMapper)
  container.bind<MemberRepositoryPort>(MEMBER_TYPES.REPOSITORY).to(MemberSequelizeRepository)
  container.bind(MEMBER_TYPES.SEQUELIZE_MODEL).toConstantValue(MemberModel)

  container.bind(MemberSequelizeRepositoryQuery).toSelf()

  container.bind(CreateMemberWhenUserIsCreatedDomainEventHandler).toSelf()

  container.bind(FindCurrentMemberController).toSelf()

  container.bind(FindMemberByLoginController).toSelf()
  container.bind(FindMemberLoginService).toSelf()

  container.bind(BanMemberController).toSelf()
  container.bind(BanMemberService).toSelf()
}

export default MemberModule
