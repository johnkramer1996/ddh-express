import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../../../shared/domain/entity'
import { CommentVotes } from '../../value-objects/votes.value-objcect'
import { CommentVoteEntity } from '../comment-vote/entity'
import { TemplateCreatedDomainEvent } from './events/created.domain-event'
import { TemplateDeletedDomainEvent } from './events/deleted.domain-event'
import { CommentEntityCreationProps, CommentEntityProps } from './types'

type UpdateTextProps = {
  text: string
}

export class CommentEntity extends AggregateRoot<CommentEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: CommentEntityCreationProps): CommentEntity {
    const props: CommentEntityProps = { ...create, votes: new CommentVotes() }
    const entity = new CommentEntity({ props })

    entity.addEvent(new TemplateCreatedDomainEvent({ entity }))

    return entity
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

  public updateText(props: UpdateTextProps): void {
    if (props.text === this.props.text) return

    const newText = props.text
    // this.addEvent(new TodoTextChangedDomainEvent({ entity: this, oldText: this.props.text, newText }))
    this.props.text = newText
  }

  public delete(): void {
    this.addEvent(new TemplateDeletedDomainEvent({ entity: this }))
  }

  public validate(): void {}
}
