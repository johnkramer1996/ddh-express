import { DomainEvent } from '@src/shared/domain/events/domain-event.base'
import { CommentEntity } from '../entity'

export class CommentDeletedDomainEvent extends DomainEvent {
  declare entity: CommentEntity
}
