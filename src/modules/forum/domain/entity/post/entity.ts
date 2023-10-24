import { v4 } from 'uuid'
import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID, BaseEntityProps } from '../../../../../shared/domain/entity'
import { PostEntityCreationProps, PostEntityProps } from './types'
import { PostVotes, Votes } from '../../value-objects/votes.value-objcect'
import { PostVoteEntity } from '../post-vote/entity'
import { PostDeletedDomainEvent } from './events/deleted.domain-event'
import { PostCreatedDomainEvent } from './events/created.domain-event'
import { PostVoteChangedCreatedDomainEvent } from './events/vote-changed.domain-event'
import { CommentEntity } from '../comments/entity'
import { PostComments } from '../../value-objects/comments.value-objcect'
import { VoteType } from '../vote.base.entity'

export class PostEntity extends AggregateRoot<PostEntityProps> {
  public static maxCountCommentByUser = 27
  protected readonly _id!: AggregateID

  static create(create: PostEntityCreationProps): PostEntity {
    // commentIds: [],
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

  public placeVote(newVote: PostVoteEntity): void {
    // TODO: https://medium.com/ssense-tech/ddd-beyond-the-basics-mastering-aggregate-design-26591e218c8c
    // private status: 'approved' | 'cancelled' | 'draft';
    //   if (this.status !== 'draft') {
    //     throw new Error('Cannot add item to a purchase order that is not in draft
  }

  /**@private */
  public addVote(vote: PostVoteEntity): void {
    this.props.votes.add(vote)
    this.addEvent(new PostVoteChangedCreatedDomainEvent({ entity: this, vote }))
  }

  /**@private */
  public removeVote(vote: PostVoteEntity): void {
    this.props.votes.remove(vote)
    this.addEvent(new PostVoteChangedCreatedDomainEvent({ entity: this, vote }))
  }

  public addComment(commentId: AggregateID): void {
    // this.props.commentIds.push(commentId)
    this.props.totalNumComments++
    // this.addEvent(new CommentPosted(this, comment));
  }

  public removeComment(commentId: AggregateID): void {
    // this.props.commentIds.remove(comment)
    this.props.totalNumComments--
    // this.addEvent(new CommentPosted(this, comment));
  }

  public updateComment(commentId: AggregateID): void {
    // this.props.commentIds.update(comment)
    // this.addEvent(new CommentVotesChanged(this, comment));
  }

  public getProps(): PostEntityProps & BaseEntityProps {
    return { ...super.getProps(), points: this.points }
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
