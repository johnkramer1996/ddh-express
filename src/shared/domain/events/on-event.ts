import { container } from '@src/shared/di/container'
import { DomainEvents } from './domain-events'
import { DomainEvent } from './domain-event.base'
import { IHandler } from '@src/modules/forum/application/event-handlers/create-member-when-is-created.domain-event-handler'

export function OnEvent(name: string) {
  return (target: any) => {
    DomainEvents.register((event: DomainEvent) => {
      const instance: IHandler = container.get(target)
      instance.handle(event)
    }, name)
  }
}
