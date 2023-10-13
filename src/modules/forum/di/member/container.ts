import { Container } from 'inversify'
import { MEMBER_TYPES } from './types'
import { PostMapper } from '../../mappers/post/mapper'
import { FindCurrentMemberController } from '../../useCases/member/queries/find-current-member/controller'
import { FindMemberByLoginController } from '../../useCases/member/queries/find-member-by-login/controller'
import { FindMemberLoginService } from '../../useCases/member/queries/find-member-by-login/service'
import { MemberRepositoryPort } from '../../repository/member/repository.port'
import MemberModel from '@src/shared/infra/database/sequelize/models/member.model'
import { MemberSequelizeRepository } from '../../repository/member/repository.sequelize'
import { MemberMapper } from '../../mappers/member/mapper'
import { CreateMemberWhenUserIsCreatedDomainEventHandler } from '../../application/event-handlers/create-member-when-is-created.domain-event-handler'

const MemberModule = (container: Container) => {
  container.bind(MEMBER_TYPES.MAPPER).to(MemberMapper)
  container.bind<MemberRepositoryPort>(MEMBER_TYPES.REPOSITORY).to(MemberSequelizeRepository)
  container.bind(MEMBER_TYPES.SEQUELIZE_MODEL).toConstantValue(MemberModel)

  container.bind(CreateMemberWhenUserIsCreatedDomainEventHandler).toSelf()

  container.bind(FindCurrentMemberController).toSelf()

  container.bind(FindMemberByLoginController).toSelf()
  container.bind(FindMemberLoginService).toSelf()
}

export default MemberModule
