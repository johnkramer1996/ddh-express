import { DomainEvent, DomainEventProps } from '@src/shared/domain/events/domain-event.base'
import { PostEntity } from '../entity'
import { PostVoteEntity } from '../../post-vote/entity'

export class PostVoteChangedCreatedDomainEvent extends DomainEvent {
  public declare readonly entity: PostEntity
  public readonly vote: PostVoteEntity

  constructor(props: DomainEventProps<PostVoteChangedCreatedDomainEvent>) {
    super(props)
    this.vote = props.vote
  }
}
