import { AggregateID, Entity } from '../entity'

export type DomainEventProps<T> = Omit<T, 'dateTimeOccurred' | 'aggregateId' | 'getAggregateId'>

export abstract class DomainEvent {
  public readonly dateTimeOccurred: Date
  public readonly entity: Entity<any>

  public readonly aggregateId: AggregateID

  constructor(props: DomainEventProps<DomainEvent>) {
    this.dateTimeOccurred = new Date()
    this.entity = props.entity
    this.aggregateId = props.entity.id
  }

  getAggregateId(): AggregateID {
    return this.entity.id
  }
}
