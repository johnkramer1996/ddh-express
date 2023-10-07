import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../../../shared/domain/entity'
import { TemplateCreatedDomainEvent } from './events/created.domain-event'
import { TemplateDeletedDomainEvent } from './events/deleted.domain-event'
import { CommentEntityCreationProps, CommentEntityProps } from './types'

export class CommentEntity extends AggregateRoot<CommentEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: CommentEntityCreationProps): CommentEntity {
    const props: CommentEntityProps = { ...create }
    const entity = new CommentEntity({ props })

    entity.addEvent(new TemplateCreatedDomainEvent({ entity }))

    return entity
  }

  public delete(): void {
    this.addEvent(new TemplateDeletedDomainEvent({ entity: this }))
  }

  public validate(): void {}
}
