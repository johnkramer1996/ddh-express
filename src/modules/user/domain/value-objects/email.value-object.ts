import { Guard } from '@src/shared/core/guard'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { ArgumentInvalidException, ArgumentOutOfRangeException } from '@src/shared/exceptions/exceptions'

export interface EmailCreationProps {
  value: string
}

export interface EmailProps extends EmailCreationProps {}

class Email extends ValueObject<EmailProps> {
  constructor(props: EmailProps) {
    super(props)
    this.props.value = this.format(props.value)
  }

  static create(create: EmailCreationProps) {
    const props: EmailProps = { ...create }
    return new Email(props)
  }

  get value(): string {
    return this.props.value
  }

  private isValid(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  private format(email: string): string {
    return email.trim().toLowerCase()
  }

  public async compareEmail(email: string): Promise<boolean> {
    return this.value === email
  }

  protected validate(props: EmailProps): void {
    if (!this.isValid(props.value)) {
      throw new ArgumentInvalidException('Email address not valid')
    }
  }
}

export default Email
