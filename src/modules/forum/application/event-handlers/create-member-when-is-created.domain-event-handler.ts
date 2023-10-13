import { inject, injectable } from 'inversify'
import { OnEvent } from '@src/shared/domain/events/on-event'
import { UserCreatedDomainEvent } from '@src/modules/user/domain/events/created.domain-event'
import { MemberEntity } from '../../domain/entity/member/entity'
import { MemberRepositoryPort } from '../../repository/member/repository.port'
import { MEMBER_TYPES } from '../../di/member/types'

export interface IHandler<T = any, T2 = any> {
  handle(event: T): T2
}

@injectable()
@OnEvent(UserCreatedDomainEvent.name)
export class CreateMemberWhenUserIsCreatedDomainEventHandler implements IHandler<UserCreatedDomainEvent, void> {
  constructor(@inject(MEMBER_TYPES.REPOSITORY) protected memberRepo: MemberRepositoryPort) {}

  async handle(event: UserCreatedDomainEvent): Promise<any> {
    const member = MemberEntity.create({ userId: event.entity.id })
    await this.memberRepo.save(member)
  }
}
