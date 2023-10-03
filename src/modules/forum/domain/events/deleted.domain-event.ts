import { DomainEvent, DomainEventProps } from '../../../../shared/domain/events/domain-event.base'
import { PostEntity } from '../post.entity'

export class PostDeletedDomainEvent extends DomainEvent {
  declare entity: PostEntity

  constructor(props: DomainEventProps<PostDeletedDomainEvent>) {
    super(props)
  }
}
