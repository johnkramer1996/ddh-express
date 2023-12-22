import { UserEntity } from '@src/modules/user/domain/user.entity'
import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID, BaseEntityProps } from '../../../../../shared/domain/entity'
import { CommentVotes } from '../../value-objects/votes.value-objcect'
import { CommentVoteEntity } from '../comment-vote/entity'
import { CommentCreatedDomainEvent } from './events/created.domain-event'
import { CommentDeletedDomainEvent } from './events/deleted.domain-event'
import { CommentEntityCreationProps, CommentEntityProps } from './types'
import { MemberEntity } from '../member/entity'

export type CommentUpdateTextProps = {
  text: string
}

export class CommentEntity extends AggregateRoot<CommentEntityProps> {
  protected readonly _id!: AggregateID

  /**@private PostService */
  static create(create: CommentEntityCreationProps): CommentEntity {
    const props: CommentEntityProps = { ...create, votes: new CommentVotes() }
    const entity = new CommentEntity({ props })

    entity.addEvent(new CommentCreatedDomainEvent({ entity }))

    return entity
  }

  public hasAccess(member: MemberEntity) {
    return member.id === this.props.memberId
  }

  get points(): number {
    return this.props.points + this.votes.points
  }

  get votes(): CommentVotes {
    return this.props.votes
  }

  public addVote(vote: CommentVoteEntity): void {
    this.props.votes.add(vote)
  }

  public removeVote(vote: CommentVoteEntity): void {
    this.props.votes.remove(vote)
  }

  /**@private */
  public updateText(props: CommentUpdateTextProps): void {
    if (props.text === this.props.text) return

    const newText = props.text
    // this.addEvent(new TodoTextChangedDomainEvent({ entity: this, oldText: this.props.text, newText }))
    this.props.text = newText
  }

  public getProps(): CommentEntityProps & BaseEntityProps {
    return { ...super.getProps(), points: this.points }
  }

  public delete(): void {
    this.addEvent(new CommentDeletedDomainEvent({ entity: this }))
  }

  public validate(): void {}
}
