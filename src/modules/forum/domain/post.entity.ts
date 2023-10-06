import { v4 } from 'uuid'
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../shared/domain/entity'
import { PostCreatedDomainEvent } from './events/created.domain-event'
import { PostDeletedDomainEvent } from './events/deleted.domain-event'
import { PostEntityCreationProps, PostEntityProps } from './post.types'
import { Votes } from './value-objects/votes.value-objcect'
import { VoteEntity } from './vote.entity'
import { UserEntity } from '@src/modules/user/domain/user.entity'

export class PostEntity extends AggregateRoot<PostEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: PostEntityCreationProps): PostEntity {
    const id = v4()

    const props: PostEntityProps = { ...create, points: 0, totalNumComments: 0, votes: Votes.create(), votesUsers: [] }
    const post = new PostEntity({ id, props })
    post.addEvent(new PostCreatedDomainEvent({ entity: post }))

    return post
  }

  public getProps() {
    return { ...super.getProps(), points: this.points }
  }

  get userId(): string {
    return this.props.userId
  }

  get votes(): Votes {
    return this.props.votes
  }

  get points(): number {
    return this.props.points + this.votes.points
  }

  public addVote(vote: VoteEntity, member: UserEntity): void {
    this.props.votes.add(vote)
    this.props.votesUsers.push(member)
    // this.addEvent(new PostVotesChanged(this, vote))
  }

  public removeVote(vote: VoteEntity, member: UserEntity): void {
    this.props.votes.remove(vote)
    this.props.votesUsers = this.props.votesUsers.filter((m) => m.id !== member.id)
    // this.addEvent(new PostVotesChanged(this, vote))
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
