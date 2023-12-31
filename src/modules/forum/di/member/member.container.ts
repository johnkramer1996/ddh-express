import { Container } from 'inversify'
import { MEMBER_TYPES } from './member.types'
import { FindCurrentMemberController } from '../../useCases/member/queries/find-current-member/find-current-member.controller'
import { FindMemberByLoginController } from '../../useCases/member/queries/find-member-by-login/find-member-by-login.controller'
import { FindMemberByLoginService } from '../../useCases/member/queries/find-member-by-login/find-member-by-login.service'
import { MemberRepositoryPort, MemberRepositoryQueryPort } from '../../repository/member/member.repository.port'
import { MemberModel } from '@src/shared/infra/database/sequelize/models/member.model'
import { MemberSequelizeRepository } from '../../repository/member/member.repository.sequelize'
import { MemberSequelizeRepositoryQuery } from '../../repository/member/member.repository.query.sequelize'
import { MemberMapper } from '../../mappers/member/mapper-domain'
import { CreateMemberWhenUserIsCreatedDomainEventHandler } from '../../application/event-handlers/create-member-when-is-created.domain-event-handler'
import { BanOrRecoverMemberController } from '../../useCases/member/commands/ban-or-recover-member-by-login/ban-or-recover-member-by-login.controller'
import { BanMemberService } from '../../useCases/member/commands/ban-or-recover-member-by-login/ban-or-recover-member-by-login.service'
import { MemberQueryMapper } from '../../mappers/member/mapper-query'
import { FindMembersForMessageByAuthUserController } from '../../useCases/member/queries/find-members-for-message-by-auth-user/find-members-for-message-by-auth-user.controller'
import { FindMembersForMessageByAuthUserService } from '../../useCases/member/queries/find-members-for-message-by-auth-user/find-members-for-message-by-auth-user.service'
import { UpdateLastActiveMemberController } from '../../useCases/member/commands/update-last-active-by-auth-user/update-last-active-by-auth-user.controller'
import { UpdateLastActiveMemberService } from '../../useCases/member/commands/update-last-active-by-auth-user/update-last-active-by-auth-user.service'
import { MemberRoleModel } from '@src/shared/infra/database/sequelize/models/member-role.model'
import { AddRoleToMemberController } from '../../useCases/member/commands/attach-or-detach-role-to-member/attach-or-detach-role-to-member.controller'
import { AddRoleToMemberService } from '../../useCases/member/commands/attach-or-detach-role-to-member/attach-or-detach-role-to-member.service'
import { FindMembersController } from '../../useCases/member/queries/find-members/find-members.controller'
import { FindMembersService } from '../../useCases/member/queries/find-members/find-members.service'

const memberModule = (container: Container) => {
  container.bind(MEMBER_TYPES.MAPPER).to(MemberMapper)
  container.bind(MEMBER_TYPES.QUERY_MAPPER).to(MemberQueryMapper)
  container.bind<MemberRepositoryPort>(MEMBER_TYPES.REPOSITORY).to(MemberSequelizeRepository)
  container.bind<MemberRepositoryQueryPort>(MEMBER_TYPES.QUERY_REPOSITORY).to(MemberSequelizeRepositoryQuery)
  container.bind(MEMBER_TYPES.SEQUELIZE_MODEL).toConstantValue(MemberModel)
  container.bind(MEMBER_TYPES.SEQUELIZE_ROLE_MODEL).toConstantValue(MemberRoleModel)

  container.bind(CreateMemberWhenUserIsCreatedDomainEventHandler).toSelf()

  container.bind(AddRoleToMemberController).toSelf()
  container.bind(AddRoleToMemberService).toSelf()

  container.bind(BanOrRecoverMemberController).toSelf()
  container.bind(BanMemberService).toSelf()

  container.bind(UpdateLastActiveMemberController).toSelf()
  container.bind(UpdateLastActiveMemberService).toSelf()

  container.bind(FindMembersController).toSelf()
  container.bind(FindMembersService).toSelf()

  container.bind(FindMemberByLoginController).toSelf()
  container.bind(FindMemberByLoginService).toSelf()

  container.bind(FindCurrentMemberController).toSelf()

  container.bind(FindMembersForMessageByAuthUserController).toSelf()
  container.bind(FindMembersForMessageByAuthUserService).toSelf()
}

export { memberModule }
