import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base'
import { AggregateID, Entity } from '../../../../shared/domain/entity'
import { PrimaryKey } from '@src/shared/core/primary-key'

export enum VoteType {
  'upvote' = 'upvote',
  'downvote' = 'downvote',
}

export interface VoteEntityCreationProps {
  type: VoteType
  memberId: AggregateID
}
export interface VoteModelCreationAttributes extends PrimaryKey {
  type: string
}

export abstract class VoteEntity<T extends VoteEntityCreationProps = VoteEntityCreationProps> extends Entity<T> {
  protected readonly _id!: AggregateID

  public isUpvote(): boolean {
    return this.props.type === VoteType['upvote']
  }

  public isDownvote(): boolean {
    return this.props.type === VoteType['downvote']
  }

  get memberId() {
    return this.props.memberId
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
