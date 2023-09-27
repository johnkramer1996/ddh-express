import { DomainEvent } from './domain-event.base'

type EventHandler = (event: DomainEvent) => void

export class DomainEvents {
  private static handlersMap: { [key: string]: EventHandler[] } = {}

  public static register(callback: EventHandler, eventClassName: string): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = []
    }
    console.log('register' + eventClassName)
    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers(): void {
    this.handlersMap = {}
  }

  public static dispatch(event: DomainEvent): void {
    const eventClassName = event.constructor.name

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName]
      for (let handler of handlers) {
        handler(event)
      }
    }
  }
}
