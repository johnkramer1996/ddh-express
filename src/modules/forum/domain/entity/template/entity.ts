import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../../../shared/domain/entity'
import { TemplateCreatedDomainEvent } from './events/created.domain-event'
import { TemplateDeletedDomainEvent } from './events/deleted.domain-event'
import { TemplateEntityCreationProps, TemplateEntityProps } from './types'

export class TemplateEntity extends AggregateRoot<TemplateEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: TemplateEntityCreationProps): TemplateEntity {
    const props: TemplateEntityProps = { ...create }
    const entity = new TemplateEntity({ props })
    entity.addEvent(new TemplateCreatedDomainEvent({ entity }))

    return entity
  }

  public delete(): void {
    this.addEvent(new TemplateDeletedDomainEvent({ entity: this }))
  }

  public validate(): void {}
}
