import { Guard } from '@src/shared/core/guard'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { ArgumentOutOfRangeException } from '@src/shared/exceptions/exceptions'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { TimeStamp } from '@src/shared/core/time-stamp'

//rule ->  if you can’t make a value object immutable, then it is not a value object.
//  The Address value object can now live by its own because we are able to delete a Person row from the database without deleting the corresponding Address row
//the lifetime of value objects should fully depend on the lifetime of their parent entities.
//Address doesn’t have an identity anymore and its lifetime now fully depends on the lifetime of the Person entity.
// Don’t introduce separate tables for value objects, just inline them into the parent entity’s table.
// ideally, you should always put most of the business logic into value objects
// Entities in this situation would act as wrappers upon them and represent more high-level functionality.
// don’t hesitate to refactor your domain model and convert the entity into a value object.
// 6. To recognize a value object in your domain model, mentally replace it with an integer.
// 7. Value objects shouldn’t have their own tables in the database.
// 8. Always prefer value objects over entities in your domain model.
export interface AddressCreationProps {
  country: string | null
  postalCode: string | null
  street: string | null
}

export interface AddressProps extends AddressCreationProps {}

export interface AddressModelCreationAttributes extends PrimaryKey {
  userId: string
  country: string | null
  postalCode: string | null
  street: string | null
}

export interface AddressModelAttributes extends AddressModelCreationAttributes, TimeStamp {}

export class Address extends ValueObject<AddressProps> {
  get country(): string | null {
    return this.props.country ?? null
  }

  get postalCode(): string | null {
    return this.props.postalCode ?? null
  }

  get street(): string | null {
    return this.props.street ?? null
  }

  protected validate(props: AddressCreationProps): void {
    if (props.country && !Guard.lengthIsBetween(props.country, 2, 50)) {
      throw new ArgumentOutOfRangeException('country is out of range')
    }
    if (props.street && !Guard.lengthIsBetween(props.street, 2, 50)) {
      throw new ArgumentOutOfRangeException('street is out of range')
    }
    if (props.postalCode && !Guard.lengthIsBetween(props.postalCode, 2, 50)) {
      throw new ArgumentOutOfRangeException('postalCode is out of range')
    }
  }
}
