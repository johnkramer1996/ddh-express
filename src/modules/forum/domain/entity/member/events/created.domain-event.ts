import { DomainEvent } from '@src/shared/domain/events/domain-event.base'
import { MemberEntity } from '../member.entity'

export class MemberCreatedDomainEvent extends DomainEvent {
  declare entity: MemberEntity
}
