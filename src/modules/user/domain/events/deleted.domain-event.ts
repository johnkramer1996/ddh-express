import { DomainEvent, DomainEventProps } from '../../../../shared/domain/events/domain-event.base'
import { UserEntity } from '../user.entity'

export class UserDeletedDomainEvent extends DomainEvent {
  declare entity: UserEntity

  constructor(props: DomainEventProps<UserDeletedDomainEvent>) {
    super(props)
  }
}
