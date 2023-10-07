import { DomainEvent } from '@src/shared/domain/events/domain-event.base'
import { PostEntity } from '../entity'

export class PostCreatedDomainEvent extends DomainEvent {
  declare entity: PostEntity
}
