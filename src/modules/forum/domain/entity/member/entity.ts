import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../../../shared/domain/entity'
import { MemberCreatedDomainEvent } from './events/created.domain-event'
import { MemberDeletedDomainEvent } from './events/deleted.domain-event'
import { MemberEntityCreationProps, MemberEntityProps } from './types'
import { ForbiddenException } from '@src/shared/exceptions/exceptions'

export class MemberEntity extends AggregateRoot<MemberEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: MemberEntityCreationProps): MemberEntity {
    const props: MemberEntityProps = { ...create, reputation: 0, isBanned: false, lastActiveAt: null }
    const entity = new MemberEntity({ props })
    entity.addEvent(new MemberCreatedDomainEvent({ aggregateId: entity.id }))

    return entity
  }

  get userId(): AggregateID {
    return this.props.userId
  }

  get isBanned(): boolean {
    return this.props.isBanned
  }

  public hasAccess(member: MemberEntity) {
    return this.id === member.id
  }

  public updateLastActive() {
    this.props.lastActiveAt = new Date()
  }

  public ban(member: MemberEntity): void {
    if (!member.hasAccess(member)) throw new ForbiddenException()
    this.props.isBanned = true
  }

  public recover(member: MemberEntity): void {
    if (!member.hasAccess(member)) throw new ForbiddenException()
    this.props.isBanned = false
  }

  public delete(): void {
    this.addEvent(new MemberDeletedDomainEvent({ aggregateId: this.id }))
  }

  public validate(): void {}
}
