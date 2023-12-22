import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID, BaseEntityProps } from '../../../../../shared/domain/entity'
import { PostEntityCreationProps, PostEntityProps, UpdatePostProps } from './types'
import { PostVotes, Votes } from '../../value-objects/votes.value-objcect'
import { PostVoteEntity } from '../post-vote/entity'
import { PostDeletedDomainEvent } from './events/deleted.domain-event'
import { PostCreatedDomainEvent } from './events/created.domain-event'
import { PostVoteChangedCreatedDomainEvent } from './events/vote-changed.domain-event'
import { MemberEntity } from '../member/entity'

export class PostEntity extends AggregateRoot<PostEntityProps> {
  public static maxCountCommentByUser = 200
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

  get slug(): string {
    return this.props.slug.value
  }

  public hasAccess(member: MemberEntity) {
    return member.id === this.props.memberId
  }

  /**@private */
  public update(props: UpdatePostProps): void {
    if (props.image && props.image !== this.props.image) {
      const newImage = props.image
      this.props.image = newImage
    }
    if (props.title && props.title !== this.props.title) {
      const newTitle = props.title
      this.props.title = newTitle
    }
    if (props.text && props.text !== this.props.text) {
      const newText = props.text
      this.props.text = newText
    }
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

  public addComment(): void {
    // this.props.commentIds.push(commentId)
    this.props.totalNumComments++
    // this.addEvent(new CommentPosted(this, comment));
  }

  public removeComment(): void {
    // this.props.commentIds.remove(comment)
    this.props.totalNumComments--
    // this.addEvent(new CommentPosted(this, comment));
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
