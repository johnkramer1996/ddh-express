import { Guard } from '../../../../shared/core/guard'
import { ValueObject } from '../../../../shared/domain/value-object.base'
import { ArgumentOutOfRangeException } from '../../../../shared/exceptions'

export interface TextProps {
  value: string
}

export class Text extends ValueObject<TextProps> {
  public static maxLength: number = 15
  public static minLength: number = 2

  get value(): string {
    return this.props.value
  }

  protected validate(props: TextProps): void {
    if (!Guard.lengthIsBetween(props.value, Text.minLength, Text.maxLength)) {
      throw new ArgumentOutOfRangeException('text is out of range')
    }
  }
}
