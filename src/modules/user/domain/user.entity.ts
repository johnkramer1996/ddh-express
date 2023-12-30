import { v4 } from 'uuid'
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../shared/domain/entity'
import { JWTClaims, JWTToken, RefreshToken } from '../../../shared/core/jwt'
import { Address } from '@src/modules/user/domain/value-objects/address.value-object'
import { UserEntityProps, UserEntityCreationProps, UpdateUserProps } from './user.types'
import { UserLoggedInDomainEvent } from './events/user.logged-in.domain-event'
import { UserCreatedDomainEvent } from './events/user.created.domain-event'
import { UserDeletedDomainEvent } from './events/user.deleted.domain-event'
import { Login } from './value-objects/login.value-object'
import { Email } from './value-objects/email.value-object'
import { ForbiddenException } from '@src/shared/exceptions/exceptions'
import { Password } from './value-objects/password.value-object'

export class UserEntity extends AggregateRoot<UserEntityProps> {
  protected readonly _id!: AggregateID
  private _accessToken?: JWTToken
  private _refreshToken?: RefreshToken

  static create(create: UserEntityCreationProps): UserEntity {
    const id = v4()

    const props: UserEntityProps = {
      ...create,
      avatar: null,
      firstName: null,
      lastName: null,
      isEmailVerified: false,
      isDeleted: false,
      lastLogin: null,
      address: new Address({
        country: null,
        postalCode: null,
        street: null,
      }),
    }
    const user = new UserEntity({ id, props })

    user.addEvent(new UserCreatedDomainEvent({ aggregateId: user.id }))

    return user
  }

  get avatar(): string | null {
    return this.props.avatar
  }

  get login(): Login {
    return this.props.login
  }

  get email(): Email {
    return this.props.email
  }

  get accessToken(): JWTToken | undefined {
    return this._accessToken
  }

  get refreshToken(): RefreshToken | undefined {
    return this._refreshToken
  }

  get address(): Address {
    return this.props.address
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken
  }

  set refreshToken(refreshToken: RefreshToken) {
    this._refreshToken = refreshToken
  }

  public hasAccess(user: UserEntity) {
    return user.id === this.id
  }

  public getJWTClaims(): JWTClaims {
    return {
      id: this.id,
      login: this.login.value,
      email: this.email.value,
    }
  }

  public async comparePassword(password: string): Promise<boolean> {
    return this.props.password.comparePassword(password)
  }

  public setAccessToken(accessToken: JWTToken, refreshToken: RefreshToken): void {
    this.addEvent(new UserLoggedInDomainEvent({ aggregateId: this.id }))
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.props.lastLogin = new Date()
  }

  public restore(): void {
    // this.addEvent(new UserDeletedDomainEvent({ entity: this }))
    // this.props.isDeleted = false
  }

  public delete(authUser: UserEntity): void {
    if (!this.hasAccess(authUser)) throw new ForbiddenException()
    this.addEvent(new UserDeletedDomainEvent({ aggregateId: this.id }))
    // this.props.isDeleted = true
  }

  public update(authUser: UserEntity, props: UpdateUserProps): void {
    if (!this.hasAccess(authUser)) throw new ForbiddenException()

    if (props.email && props.email !== this.props.email.value) {
      this.props.email = Email.create({ value: props.email })
    }
    if (props.password && props.password !== this.props.password.value) {
      this.props.password = Password.create({ value: props.password })
    }
    if (props.avatar && props.avatar !== this.props.avatar) {
      this.props.avatar = props.avatar
    }
    if (props.deleteAvatar && '' !== this.props.avatar) {
      this.props.avatar = null
    }
    if (props.firstName && props.firstName !== this.props.firstName) {
      this.props.firstName = props.firstName
    }
    if (props.lastName && props.lastName !== this.props.lastName) {
      this.props.lastName = props.lastName
    }
  }

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
