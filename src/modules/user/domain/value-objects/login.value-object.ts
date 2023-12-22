import { Guard } from '@src/shared/core/guard'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { ArgumentInvalidException, ArgumentOutOfRangeException } from '@src/shared/exceptions/exceptions'

export interface LoginCreationProps {
  value: string
}

export interface LoginProps extends LoginCreationProps {}

export class Login extends ValueObject<LoginProps> {
  public static minLength = 2
  public static maxLength = 15

  constructor(props: LoginProps) {
    super(props)
  }

  static create(create: LoginCreationProps) {
    const props: LoginProps = { ...create }
    return new Login(props)
  }

  get value(): string {
    return this.props.value
  }

  private isValid(login: string) {
    const re = /^\S+$/
    return re.test(login)
  }

  public async compareEmail(email: string): Promise<boolean> {
    return this.value === email
  }

  protected validate(props: LoginProps): void {
    if (!Guard.lengthIsBetween(props.value, Login.minLength, Login.maxLength)) {
      throw new ArgumentOutOfRangeException(`Login is out of range [${Login.minLength}-${Login.maxLength} chars].`)
    }
    if (!this.isValid(props.value)) {
      throw new ArgumentInvalidException('Login not valid')
    }
  }
}
