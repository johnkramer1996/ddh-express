import { AggregateID } from '@src/shared/domain/entity'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { MemberQuery } from '../member/member.query'
import { PostStatus } from './post.types'

type QueryProps = {
  id: string
  createdAt: Date
  updatedAt: Date | null
  moderatedAt: Date | null
  memberId: string
  status: PostStatus
  slug: string
  image: string
  title: string
  text: string
  points: number
  totalNumComments: number
  wasUpvotedByMe: boolean
  wasDownvotedByMe: boolean
  member: MemberQuery
}

export class PostQuery extends ValueObject<QueryProps> {
  validate(): void {}

  get id(): string {
    return this.props.id
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt
  }

  get moderatedAt(): Date | null {
    return this.props.moderatedAt
  }

  get memberId(): string {
    return this.props.memberId
  }

  get status(): PostStatus {
    return this.props.status
  }

  get slug(): string {
    return this.props.slug
  }

  get image(): string {
    return this.props.image
  }

  get title(): string {
    return this.props.title
  }

  get text(): string {
    return this.props.text
  }

  get points(): number {
    return this.props.points
  }

  get totalNumComments(): number {
    return this.props.totalNumComments
  }

  get wasUpvotedByMe(): boolean {
    return this.props.wasUpvotedByMe
  }

  get wasDownvotedByMe(): boolean {
    return this.props.wasDownvotedByMe
  }

  get member(): MemberQuery {
    return this.props.member
  }
}
