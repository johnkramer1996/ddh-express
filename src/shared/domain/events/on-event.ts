import { DomainEvents } from './domain-events'

export function OnEvent(name: string) {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    DomainEvents.register(descriptor.value.bind(descriptor), name)
  }
}
