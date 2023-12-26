import { Entity } from './entity'

export interface Mapper<DomainEntity extends Entity<any>, DbRecord> {
  toPersistence(entity: DomainEntity): DbRecord
  toDomain(record: any): DomainEntity
}
