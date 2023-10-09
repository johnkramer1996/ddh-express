import { UserEntity } from '@src/modules/user/domain/user.entity'
import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../../../shared/domain/entity'
import { CommentVotes } from '../../value-objects/votes.value-objcect'
import { CommentVoteEntity } from '../comment-vote/entity'
import { CommentCreatedDomainEvent } from './events/created.domain-event'
import { CommentDeletedDomainEvent } from './events/deleted.domain-event'
import { CommentEntityCreationProps, CommentEntityProps } from './types'

export type CommentUpdateTextProps = {
  text: string
}

export class CommentEntity extends AggregateRoot<CommentEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: CommentEntityCreationProps): CommentEntity {
    const props: CommentEntityProps = { ...create, votes: new CommentVotes(), user: null }
    const entity = new CommentEntity({ props })

    entity.addEvent(new CommentCreatedDomainEvent({ entity }))

    return entity
  }

  public hasAccess(user: UserEntity) {
    return user.id === this.props.userId
  }

  get points(): number {
    return this.props.points + this.votes.points
  }

  get votes(): CommentVotes {
    return this.props.votes
  }

  public addVote(vote: CommentVoteEntity): void {
    this.props.votes.add(vote)
    // this.addEvent(new PostVoteChangedCreatedDomainEvent({ entity: this, vote }))
  }

  public removeVote(vote: CommentVoteEntity): void {
    this.props.votes.remove(vote)
    // this.addEvent(new PostVoteChangedCreatedDomainEvent({ entity: this, vote }))
  }

  public updateText(props: CommentUpdateTextProps): void {
    if (props.text === this.props.text) return

    const newText = props.text
    // this.addEvent(new TodoTextChangedDomainEvent({ entity: this, oldText: this.props.text, newText }))
    this.props.text = newText
  }

  protected _getProps(): Partial<CommentEntityProps> {
    return { points: this.points }
  }

  public delete(): void {
    this.addEvent(new CommentDeletedDomainEvent({ entity: this }))
  }

  public validate(): void {}
}
