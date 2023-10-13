import { AggregateRoot } from '../../../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../../../shared/domain/entity'
import { MemberCreatedDomainEvent } from './events/created.domain-event'
import { MemberDeletedDomainEvent } from './events/deleted.domain-event'
import { MemberEntityCreationProps, MemberEntityProps } from './types'

export class MemberEntity extends AggregateRoot<MemberEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: MemberEntityCreationProps): MemberEntity {
    const props: MemberEntityProps = { ...create, reputation: 0, isBanned: false, user: null }
    const entity = new MemberEntity({ props })
    entity.addEvent(new MemberCreatedDomainEvent({ entity }))

    return entity
  }

  public delete(): void {
    this.addEvent(new MemberDeletedDomainEvent({ entity: this }))
  }

  public validate(): void {}
}
