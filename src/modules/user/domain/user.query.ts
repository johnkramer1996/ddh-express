import { AggregateID } from '@src/shared/domain/entity'
import { ValueObject } from '@src/shared/domain/value-object.base'

interface UserQueryProps {
  id: string
  createdAt: Date
  updatedAt: Date
  avatar: string | null
  login: string
  email: string
  firstName: string | null
  lastName: string | null
  country: string | null
  postalCode: string | null
  street: string | null
  isDeleted: boolean
  lastLogin: Date | null
  posts?: any[]
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

  get avatar(): string | null {
    return this.props.avatar
  }

  get login(): string {
    return this.props.login
  }

  get email(): string {
    return this.props.email
  }

  get firstName(): string | null {
    return this.props.firstName
  }

  get lastName(): string | null {
    return this.props.lastName
  }

  get country(): string | null {
    return this.props.country
  }

  get postalCode(): string | null {
    return this.props.postalCode
  }

  get street(): string | null {
    return this.props.street
  }

  get isDeleted(): boolean {
    return this.props.isDeleted
  }

  get lastLogin(): Date | null {
    return this.props.lastLogin
  }
}
