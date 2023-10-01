import { ExceptionBase } from '@src/shared/exceptions/exception.base'
import { NotFoundException } from '@src/shared/exceptions/exceptions'

export class UserNotFoundException extends NotFoundException {
  constructor(value: string, field = 'id') {
    super(`Couldn't find a user by ${field} {${value}}.`)
  }
}

export class PasswordDoesntMatchException extends ExceptionBase {
  code = 'code'
  constructor() {
    super(`Password doesnt match error.`)
  }
}
