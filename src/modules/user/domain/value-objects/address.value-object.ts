import { Guard } from '@src/shared/core/guard'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { ArgumentOutOfRangeException } from '@src/shared/exceptions/exceptions'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { TimeStamp } from '@src/shared/core/time-stamp'

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
