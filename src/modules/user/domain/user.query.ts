import { AggregateID } from '@src/shared/domain/entity'
import { ValueObject } from '@src/shared/domain/value-object.base'

interface UserQueryProps {
  id: string
  createdAt: Date
  updatedAt: Date
  login: string
  password: string
  email: string
}

export class UserQuery extends ValueObject<UserQueryProps> {
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

  get login(): string {
    return this.props.login
  }

  get password(): string {
    return this.props.password
  }

  get email(): string {
    return this.props.email
  }
}
