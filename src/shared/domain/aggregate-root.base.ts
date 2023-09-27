import { DomainEvent } from './events/domain-event.base'
import { DomainEvents } from './events/domain-events'
import { Entity } from './entity'
import { envCongig } from '@src/configs/config'

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[] = []

  // get id(): UniqueEntityID {
  //   return this._id
  // }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    this.logDomainEventAdded(domainEvent)
  }

  public clearEvents(): void {
    this._domainEvents = []
  }

  public async publishEvents(): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        if (!envCongig.isTest) console.log(`[Domain Event execute]: ${event.constructor.name} event published for aggregate : ${this.id}`)
        return DomainEvents.dispatch(event)
      })
    )
    this.clearEvents()
  }

  // protected addEvent(domainEvent: IDomainEvent): void {
  //   this._domainEvents.push(domainEvent)
  //   DomainEvents.markAggregateForDispatch(this)
  //   this.logDomainEventAdded(domainEvent)
  // }

  private logDomainEventAdded(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this)
    const domainEventClass = Reflect.getPrototypeOf(domainEvent)
    if (!thisClass || !domainEventClass) return
    console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name)
  }
}
