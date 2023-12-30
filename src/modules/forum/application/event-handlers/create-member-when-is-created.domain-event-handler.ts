import { inject, injectable } from 'inversify'
import { OnEvent } from '@src/shared/domain/events/on-event'
import { UserCreatedDomainEvent } from '@src/modules/user/domain/events/user.created.domain-event'
import { MemberEntity } from '../../domain/entity/member/member.entity'
import { MemberRepositoryPort } from '../../repository/member/member.repository.port'
import { MEMBER_TYPES } from '../../di/member/member.types'
import { IHandler } from '@src/shared/domain/events/ihandler'

@injectable()
@OnEvent(UserCreatedDomainEvent.name)
export class CreateMemberWhenUserIsCreatedDomainEventHandler implements IHandler<UserCreatedDomainEvent> {
  constructor(@inject(MEMBER_TYPES.REPOSITORY) protected memberRepo: MemberRepositoryPort) {}

  async handle(event: UserCreatedDomainEvent): Promise<any> {
    const member = MemberEntity.create({ userId: event.getAggregateId() })
    await this.memberRepo.save(member)
  }
}
