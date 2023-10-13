import { Guard } from '@src/shared/core/guard'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { ArgumentInvalidException, ArgumentOutOfRangeException } from '@src/shared/exceptions/exceptions'
import bcrypt from 'bcrypt'

export interface PasswordCreationProps {
  value: string
  hashed?: boolean
}

export interface PasswordProps extends PasswordCreationProps {
  hashed: boolean
}

export class Password extends ValueObject<PasswordProps> {
  public static minLength = 7
  public static maxLength = 20
  public static salt = 8

  constructor(props: PasswordProps) {
    super(props)
    if (!props.hashed) {
      props.value = this.hashPassword(props.value)
      props.hashed = true
    }
  }

  static create(create: PasswordCreationProps) {
    const props: PasswordProps = { ...create, hashed: create.hashed ?? false }
    return new Password(props)
  }

  get value(): string {
    return this.props.value
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    if (this.isAlreadyHashed()) return this.bcryptCompare(plainTextPassword, this.props.value)
    return this.props.value === plainTextPassword
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed)
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed
  }

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, Password.salt)
  }

  protected validate(props: PasswordProps): void {
    if (!props.hashed && !Guard.lengthIsBetween(props.value, Password.minLength, Password.maxLength)) {
      throw new ArgumentOutOfRangeException(`Password is out of range [${Password.minLength}-${Password.maxLength} chars].`)
    }
  }
}
