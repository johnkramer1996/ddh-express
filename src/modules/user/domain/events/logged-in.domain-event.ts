import { DomainEvent, DomainEventProps } from '../../../../shared/domain/events/domain-event.base'
import { UserEntity } from '../user.entity'

export class UserLoggedInDomainEvent extends DomainEvent {
  declare entity: UserEntity

  constructor(props: DomainEventProps<UserLoggedInDomainEvent>) {
    super(props)
  }
}
