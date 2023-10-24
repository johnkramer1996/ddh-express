import { AggregateID } from '@src/shared/domain/entity'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { MemberQuery } from '../member/query'

interface CommentQueryProps {
  id: string
  createdAt: Date
  updatedAt: Date
  text: string
  parentId: string | null
  points: number
  countChild: number
  wasUpvotedByMe: boolean
  wasDownvotedByMe: boolean
  member: MemberQuery
}

export class CommentQuery extends ValueObject<CommentQueryProps> {
  validate(): void {}

  get id(): AggregateID {
    return this.props.id
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  get text(): string {
    return this.props.text
  }

  get member(): MemberQuery {
    return this.props.member
  }

  get parentId(): string | null {
    return this.props.parentId
  }

  get points(): number {
    return this.props.points
  }

  get countChild(): number {
    return this.props.countChild
  }

  get wasUpvotedByMe(): boolean {
    return this.props.wasUpvotedByMe
  }

  get wasDownvotedByMe(): boolean {
    return this.props.wasDownvotedByMe
  }
}
