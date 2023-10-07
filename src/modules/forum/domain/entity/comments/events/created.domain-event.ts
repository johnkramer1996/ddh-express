import { DomainEvent } from '@src/shared/domain/events/domain-event.base'
import { CommentEntity } from '../entity'

export class TemplateCreatedDomainEvent extends DomainEvent {
  declare entity: CommentEntity
}
