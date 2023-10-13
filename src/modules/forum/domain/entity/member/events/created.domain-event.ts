import { DomainEvent } from '@src/shared/domain/events/domain-event.base'
import { MemberEntity } from '../entity'

export class MemberCreatedDomainEvent extends DomainEvent {
  declare entity: MemberEntity
}
