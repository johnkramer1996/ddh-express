import { v4 } from 'uuid'
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base'
import { AggregateID, Entity } from '../../../shared/domain/entity'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { PostVoteEntityProps } from './post-vote.envity'
import { ValueObject } from '@src/shared/domain/value-object.base'

export enum VoteType {
  'upvote' = 'upvote',
  'downvote' = 'downvote',
}

export interface VoteEntityCreationProps {
  type: VoteType
}
export interface VoteModelCreationAttributes extends PrimaryKey {
  type: string
}

export abstract class VoteEntity extends AggregateRoot<PostVoteEntityProps> {
  protected readonly _id!: AggregateID

  public isUpvote(): boolean {
    return this.props.type === VoteType['upvote']
  }

  public isDownvote(): boolean {
    return this.props.type === VoteType['downvote']
  }

  public delete(): void {
    // this.addEvent(new PostDeletedDomainEvent({ entity: this }))
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
