import { DomainEvent, DomainEventProps } from '@src/shared/domain/events/domain-event.base'
import { AggregateID } from '@src/shared/domain/entity'

export class PostVoteChangedCreatedDomainEvent extends DomainEvent {
  public readonly voteAggregateId: AggregateID

  constructor(props: DomainEventProps<PostVoteChangedCreatedDomainEvent>) {
    super(props)
    this.voteAggregateId = props.voteAggregateId
  }
}
