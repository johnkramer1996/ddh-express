import { Entity } from './entity'
import { ValueObject } from './value-object.base'

export interface Mapper<DomainEntity extends Entity<any>, DbRecord, Response = any> {
  toPersistence(entity: DomainEntity): DbRecord
  toDomain(record: any): DomainEntity
  toResponse(entity: DomainEntity): Response
}
