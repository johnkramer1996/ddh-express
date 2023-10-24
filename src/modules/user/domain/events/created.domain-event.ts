import { DomainEvent, DomainEventProps } from '../../../../shared/domain/events/domain-event.base'
import { UserEntity } from '../user.entity'

// TODO:
// https://herbertograca.com/2018/07/07/more-than-concentric-layers/
// Complex objects like entities should not be used by events directly because they can be problematic to serialize/unserialize into/from a queue, so the shared code shouldn’t propagate much.
export class UserCreatedDomainEvent extends DomainEvent {
  declare entity: UserEntity

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props)
  }
}
