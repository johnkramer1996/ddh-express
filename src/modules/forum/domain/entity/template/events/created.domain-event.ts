import { DomainEvent } from '@src/shared/domain/events/domain-event.base'
import { TemplateEntity } from '../entity'

export class TemplateCreatedDomainEvent extends DomainEvent {
  declare entity: TemplateEntity
}
