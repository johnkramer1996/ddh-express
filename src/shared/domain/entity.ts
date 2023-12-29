import { v4 } from 'uuid'
import { PrimaryKey } from '../core/primary-key'
import { TimeStamp } from '../core/time-stamp'
import { convertPropsToObject } from '../utils/convert-props-to-object.util'
import { Guard } from '../core/guard'
import { ArgumentInvalidException, ArgumentNotProvidedException, ArgumentOutOfRangeException } from '../exceptions/exceptions'

export type AggregateID = string

export interface CreationEntityProps<T> {
  id?: AggregateID
  props: T
  createdAt?: Date
  updatedAt?: Date | null
}

export interface BaseEntityProps {
  id: AggregateID
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}
// PrimaryKey
export abstract class Entity<EntityProps> implements TimeStamp, PrimaryKey {
  constructor({ id, createdAt, updatedAt, props }: CreationEntityProps<EntityProps>) {
    this.setId(id)
    this.validateProps(props)
    const now = new Date()
    this._createdAt = createdAt || now
    this._updatedAt = updatedAt ?? null
    this._deletedAt = null
    this.props = props
    this.validate()
  }

  protected readonly props: EntityProps

  protected abstract _id: AggregateID

  private readonly _createdAt: Date

  private _updatedAt: Date | null

  private _deletedAt: Date | null

  get id(): AggregateID {
    return this._id
  }

  private setId(id?: AggregateID): void {
    this._id = id ?? v4()
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date | null {
    return this._updatedAt
  }

  get deletedAt(): Date | null {
    return this._deletedAt
  }

  set deletedAt(date: Date | null) {
    this._deletedAt = date
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity
  }

  /**
   *  Checks if two entities are the same Entity by comparing ID field.
   * @param object Entity
   */
  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!Entity.isEntity(object)) {
      return false
    }

    return this.id ? this.id === object.id : false
  }

  public getProps(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
      ...this.props,
    }
    return Object.freeze(propsCopy)
  }

  /**
   * Convert an Entity and all sub-entities/Value Objects it
   * contains to a plain object with primitive types. Can be
   * useful when logging an entity during testing/debugging
   */
  public toObject(): unknown {
    const plainProps = convertPropsToObject(this.props)

    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...plainProps,
    }
    return Object.freeze(result)
  }

  /**
   * There are certain rules that always have to be true (invariants)
   * for each entity. Validate method is called every time before
   * saving an entity to the database to make sure those rules are respected.
   */
  public abstract validate(): void

  private validateProps(props: EntityProps): void {
    const MAX_PROPS = 50

    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('Entity props should not be empty')
    }
    if (typeof props !== 'object') {
      throw new ArgumentInvalidException('Entity props should be an object')
    }
    if (Object.keys(props as any).length > MAX_PROPS) {
      throw new ArgumentOutOfRangeException(`Entity props should not have more than ${MAX_PROPS} properties`)
    }
  }
}
