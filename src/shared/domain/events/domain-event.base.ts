import { AggregateID, Entity } from '../entity'

export type DomainEventProps<T> = Omit<T, 'dateTimeOccurred' | 'getAggregateId'>

export abstract class DomainEvent {
  public readonly dateTimeOccurred: Date
  public readonly aggregateId: AggregateID

  constructor(props: DomainEventProps<DomainEvent>) {
    this.dateTimeOccurred = new Date()
    this.aggregateId = props.aggregateId
  }

  getAggregateId(): AggregateID {
    return this.aggregateId
  }
}
