import { Guard } from '@src/shared/core/guard'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { ArgumentOutOfRangeException } from '@src/shared/exceptions/exceptions'

export interface AddressProps {
  country?: string | null
  postalCode?: string | null
  street?: string | null
}

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

  /**
   * Note: This is a very simplified example of validation,
   * real world projects will have stricter rules.
   * You can avoid this type of validation here and validate
   * only on the edge of the application (in controllers when receiving
   * a request) sacrificing some security for performance and convenience.
   */
  protected validate(props: AddressProps): void {
    if (props.country && !Guard.lengthIsBetween(props.country, 2, 50)) {
      throw new ArgumentOutOfRangeException('country is out of range')
    }
    if (props.street && !Guard.lengthIsBetween(props.street, 2, 50)) {
      throw new ArgumentOutOfRangeException('street is out of range')
    }
    if (props.postalCode && !Guard.lengthIsBetween(props.postalCode, 2, 10)) {
      throw new ArgumentOutOfRangeException('postalCode is out of range')
    }
  }
}
