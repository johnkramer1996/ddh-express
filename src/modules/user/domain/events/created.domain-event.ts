import { DomainEvent, DomainEventProps } from '../../../../shared/domain/events/domain-event.base'
import { UserEntity } from '../user.entity'

export class UserCreatedDomainEvent extends DomainEvent {
  declare entity: UserEntity

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props)
  }
}
