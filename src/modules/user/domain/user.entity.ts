import { v4 } from 'uuid'
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../shared/domain/entity'
import { JWTToken, RefreshToken } from './jwt'
import { Address } from '@src/modules/todo/domain/value-objects/addres.value-object'

export interface CreateTodoProps {
  email: string
  password: string
}

export interface TodoProps extends CreateTodoProps {
  username: string | null
  isEmailVerified: boolean
  isAdminUser: boolean
  isDeleted: boolean
  accessToken?: JWTToken
  refreshToken?: RefreshToken
  lastLogin: Date | null
  address: Address
  // country: string | null
}

export class UserEntity extends AggregateRoot<TodoProps> {
  protected readonly _id!: AggregateID

  static create(create: CreateTodoProps): UserEntity {
    const id = v4()

    const props: TodoProps = {
      ...create,
      username: null,
      isEmailVerified: false,
      isAdminUser: false,
      isDeleted: false,
      lastLogin: null,
      address: new Address({
        country: null,
        postalCode: null,
        street: null,
      }),
    }
    const user = new UserEntity({ id, props })
    // user.addEvent(new TodoCreatedDomainEvent({ entity: user }))

    return user
  }

  get email(): string {
    return this.props.email
  }

  // get username(): string | null {
  //   return this.props.username
  // }

  // get address(): Address {
  //   return this.props.address
  // }

  get country(): string | null {
    return this.props.address.country
  }

  get street(): string | null {
    return this.props.address.street
  }

  // get isDeleted(): boolean {
  //   return this.props.isDeleted
  // }

  // get lastLogin(): Date | null {
  //   return this.props.lastLogin
  // }

  get accessToken(): string {
    if (!this.props.accessToken) throw new Error('accessToken not found')
    return this.props.accessToken
  }

  get refreshToken(): RefreshToken {
    if (!this.props.refreshToken) throw new Error('refreshToken not found')
    return this.props.refreshToken
  }

  public isLoggedIn(): boolean {
    return Boolean(this.props.accessToken) && Boolean(this.props.refreshToken)
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    // this.addEvent(new UserLoggedIn({entity: this}));
    this.props.accessToken = token
    this.props.refreshToken = refreshToken
    this.props.lastLogin = new Date()
  }

  public delete(): void {
    // this.addEvent(new TodoDeletedDomainEvent({ entity: this }))
    // this.props.isDeleted = true;
  }

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
