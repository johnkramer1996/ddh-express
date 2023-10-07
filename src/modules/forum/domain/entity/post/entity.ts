import { v4 } from 'uuid'
import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../../../shared/domain/entity'
import { PostEntityCreationProps, PostEntityProps } from './types'
import { PostVotes, Votes } from '../../value-objects/votes.value-objcect'
import { VoteEntity } from '../vote.base.entity'
import { PostVoteEntity } from '../post-vote/entity'
import { PostDeletedDomainEvent } from './events/deleted.domain-event'
import { PostCreatedDomainEvent } from './events/created.domain-event'
import { PostVoteChangedCreatedDomainEvent } from './events/vote-changed.domain-event'

export class PostEntity extends AggregateRoot<PostEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: PostEntityCreationProps): PostEntity {
    const props: PostEntityProps = { ...create, points: 0, totalNumComments: 0, votes: PostVotes.create() }
    const entity = new PostEntity({ props })

    entity.addEvent(new PostCreatedDomainEvent({ entity }))

    return entity
  }

  get votes(): PostVotes {
    return this.props.votes
  }

  get points(): number {
    return this.props.points + this.votes.points
  }

  public addVote(vote: PostVoteEntity): void {
    this.props.votes.add(vote)
    this.addEvent(new PostVoteChangedCreatedDomainEvent({ entity: this, vote }))
  }

  public removeVote(vote: PostVoteEntity): void {
    this.props.votes.remove(vote)
    this.addEvent(new PostVoteChangedCreatedDomainEvent({ entity: this, vote }))
  }

  protected _getProps(): Partial<PostEntityProps> {
    return { points: this.points }
  }

  public delete(): void {
    this.addEvent(new PostDeletedDomainEvent({ entity: this }))
  }

  validate(): void {
    // if (!this.isValidPostType(props.type)) {
    //   return Result.fail<Post>("Invalid post type provided.")
    // }
  }
}
