import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID, BaseEntityProps } from '../../../../../shared/domain/entity'
import { PostEntityCreationProps, PostEntityProps, PostStatus, UpdatePostProps } from './post.types'
import { PostVotes, Votes } from '../../value-objects/votes.value-objcect'
import { PostVoteEntity } from '../post-vote/post-vote.entity'
import { PostDeletedDomainEvent } from './events/post.deleted.domain-event'
import { PostCreatedDomainEvent } from './events/post.created.domain-event'
import { PostVoteChangedCreatedDomainEvent } from './events/post.vote-changed.domain-event'
import { MemberEntity } from '../member/member.entity'
import { Role } from '../../value-objects/role.value-object'

export class PostEntity extends AggregateRoot<PostEntityProps> {
  public static maxCountPostByUser = 100
  public static maxCountCommentByUser = 20
  private static permission: Role[] = [new Role({ value: 'admin' }), new Role({ value: 'editor' })]
  protected readonly _id!: AggregateID

  static create(create: PostEntityCreationProps): PostEntity {
    const props: PostEntityProps = { ...create, points: 0, totalNumComments: 0, votes: PostVotes.create(), moderatedAt: null }
    const entity = new PostEntity({ props })

    entity.addEvent(new PostCreatedDomainEvent({ aggregateId: entity.id }))

    return entity
  }

  get status(): PostStatus {
    return this.props.status
  }

  get image(): string {
    return this.props.image
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

  public hasPermission(member: MemberEntity): boolean {
    return Boolean(PostEntity.permission.find((role) => member.roles.exists(role)))
  }

  public hasAccess(member: MemberEntity): boolean {
    return this.id === member.id || this.hasPermission(member)
  }

  // public hasPermission(member: MemberEntity) {
  //   return member.id === this.props.memberId
  // }

  // TODO: REMOVE
  // public moderate(status: PostStatus) {
  //   if (!['pending', 'resolved', 'rejected'].includes(status)) throw new Error('State must be pending | resolved | rejected')
  //   this.props.status = status
  //   this.props.moderatedAt = new Date()
  // }

  /**@private */
  public update(props: UpdatePostProps): void {
    if (props.status && props.status !== this.props.status) {
      if (!['publish', 'pending', 'draft', 'trash'].includes(props.status)) throw new Error('Status must be publish | pending | draft | trash')
      this.props.status = props.status
    }
    if (props.image && props.image !== this.props.image) {
      this.props.image = props.image
    }
    if (props.title && props.title !== this.props.title) {
      this.props.title = props.title
    }
    if (props.text && props.text !== this.props.text) {
      this.props.text = props.text
    }
  }

  /**@private */
  public addVote(vote: PostVoteEntity): void {
    this.votes.add(vote)
    this.addEvent(new PostVoteChangedCreatedDomainEvent({ aggregateId: this.id, voteAggregateId: vote.id }))
  }

  /**@private */
  public removeVote(vote: PostVoteEntity): void {
    this.votes.remove(vote)
    this.addEvent(new PostVoteChangedCreatedDomainEvent({ aggregateId: this.id, voteAggregateId: vote.id }))
  }

  public addComment(): void {
    this.props.totalNumComments++
  }

  public removeComment(): void {
    this.props.totalNumComments--
  }

  public getProps(): PostEntityProps & BaseEntityProps {
    return { ...super.getProps(), points: this.points }
  }

  public delete(): void {
    this.addEvent(new PostDeletedDomainEvent({ aggregateId: this.id }))
  }

  validate(): void {}
}
