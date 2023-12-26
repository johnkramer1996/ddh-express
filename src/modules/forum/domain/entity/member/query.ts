import { AggregateID } from '@src/shared/domain/entity'
import { ValueObject } from '@src/shared/domain/value-object.base'

type QueryProps = {
  id: string
  createdAt: Date
  updatedAt: Date
  reputation: number
  avatar: string | null
  login: string
  email: string
  lastActiveAt: Date | null
  isBanned: boolean
}

export class MemberQuery extends ValueObject<QueryProps> {
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

  get reputation(): number {
    return this.props.reputation
  }

  get avatar(): string | null {
    return this.props.avatar
  }

  get login(): string {
    return this.props.login
  }

  get email(): string {
    return this.props.email
  }

  get isOnline(): boolean {
    const lastTime = Date.now() - 1000 * 60 * 10 // 10 min
    const lastActive = this.props.lastActiveAt
    return lastActive ? lastActive.getTime() > lastTime : false
  }

  get isBanned(): boolean {
    return this.props.isBanned
  }
}
