import { container } from '@src/shared/di/container'
import { CreateMemberWhenUserIsCreatedDomainEventHandler } from './create-member-when-is-created.domain-event-handler'

container.get(CreateMemberWhenUserIsCreatedDomainEventHandler)
