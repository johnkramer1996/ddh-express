import { v4 } from 'uuid'
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../shared/domain/entity'
import { JWTClaims, JWTToken, RefreshToken } from '../../../shared/core/jwt'
import { Address } from '@src/modules/user/domain/value-objects/address.value-object'
import { UserEntityProps, UserEntityCreationProps } from './user.types'
import { UserLoggedInDomainEvent } from './events/logged-in.domain-event'
import { UserCreatedDomainEvent } from './events/created.domain-event'
import { UserDeletedDomainEvent } from './events/deleted.domain-event'

export class UserEntity extends AggregateRoot<UserEntityProps> {
  protected readonly _id!: AggregateID
  private _accessToken?: JWTToken
  private _refreshToken?: RefreshToken

  static create(create: UserEntityCreationProps): UserEntity {
    const id = v4()

    const props: UserEntityProps = {
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

    user.addEvent(new UserCreatedDomainEvent({ entity: user }))

    return user
  }

  get email(): string {
    return this.props.email
  }

  get accessToken(): JWTToken | undefined {
    return this._accessToken
  }

  get refreshToken(): RefreshToken | undefined {
    return this._refreshToken
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken
  }

  set refreshToken(refreshToken: RefreshToken) {
    this._refreshToken = refreshToken
  }

  public getJWTClaims(): JWTClaims {
    return {
      id: this.id,
      email: this.props.email,
    }
  }

  public async comparePassword(password: string): Promise<boolean> {
    return this.props.password.comparePassword(password)
  }

  public setAccessToken(accessToken: JWTToken, refreshToken: RefreshToken): void {
    this.addEvent(new UserLoggedInDomainEvent({ entity: this }))
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.props.lastLogin = new Date()
  }

  public delete(): void {
    this.addEvent(new UserDeletedDomainEvent({ entity: this }))
    this.props.isDeleted = true
  }

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
