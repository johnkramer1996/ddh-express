import { DomainEvent, DomainEventProps } from '../../../../shared/domain/events/domain-event.base'

export class UserLoggedInDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<UserLoggedInDomainEvent>) {
    super(props)
  }
}
