import { Guard } from '@src/shared/core/guard'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { ArgumentOutOfRangeException } from '@src/shared/exceptions/exceptions'

export interface PasswordCreationProps {
  value: string
}

export interface PasswordProps extends PasswordCreationProps {}

export class Password extends ValueObject<PasswordProps> {
  get value(): string {
    return this.props.value
  }

  public async comparePassword(password: string): Promise<boolean> {
    return this.value === password
  }

  protected validate(props: PasswordCreationProps): void {
    if (props.value && !Guard.lengthIsBetween(props.value, 5, 20)) {
      throw new ArgumentOutOfRangeException('password is out of range')
    }
  }
}
