import { Role } from '@src/modules/forum/domain/value-objects/role.value-object'
import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../../../shared/domain/entity'
import { MemberCreatedDomainEvent } from './events/created.domain-event'
import { MemberDeletedDomainEvent } from './events/deleted.domain-event'
import { MemberEntityCreationProps, MemberEntityProps, MemberRole } from './member.types'
import { ArgumentInvalidException, ForbiddenException } from '@src/shared/exceptions/exceptions'
import { Roles } from '../../value-objects/roles.value-object'

export class MemberEntity extends AggregateRoot<MemberEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: MemberEntityCreationProps): MemberEntity {
    const props: MemberEntityProps = { ...create, reputation: 0, isBanned: false, lastActiveAt: null, roles: new Roles([Role.create({ value: 'subscriber' })]) }
    const entity = new MemberEntity({ props })
    entity.addEvent(new MemberCreatedDomainEvent({ aggregateId: entity.id }))

    return entity
  }

  get userId(): AggregateID {
    return this.props.userId
  }

  get roles(): Roles {
    return this.props.roles
  }

  get isBanned(): boolean {
    return this.props.isBanned
  }

  public hasPermission(roles: MemberRole[]): boolean {
    return roles.some((role) => this.roles.exists(new Role({ value: role })))
  }

  public hasAccess(member: MemberEntity): boolean {
    return this.id === member.id
  }

  public attachRole(member: MemberEntity, role: Role) {
    if (!member.hasPermission(['admin'])) throw new ForbiddenException()
    if (this.roles.exists(role)) throw new ArgumentInvalidException('Role already exist')
    this.roles.add(role)
  }

  public detachRole(member: MemberEntity, role: Role) {
    if (!member.hasPermission(['admin'])) throw new ForbiddenException()
    if (role.value === 'admin' && this.hasPermission(['admin'])) throw new ForbiddenException()
    if (!this.roles.exists(role)) throw new ArgumentInvalidException('Role not exist')
    this.roles.remove(role)
  }

  public updateLastActive(): void {
    this.props.lastActiveAt = new Date()
  }

  public ban(member: MemberEntity): void {
    if (!member.hasPermission(['admin'])) throw new ForbiddenException()
    this.props.isBanned = true
  }

  public recover(member: MemberEntity): void {
    if (!member.hasPermission(['admin'])) throw new ForbiddenException()
    this.props.isBanned = false
  }

  public delete(): void {
    this.addEvent(new MemberDeletedDomainEvent({ aggregateId: this.id }))
  }

  public validate(): void {}
}
