import { ExceptionBase } from '@src/shared/exceptions/exception.base'
import { ArgumentInvalidException, ConflictException } from '@src/shared/exceptions/exceptions'

export class PasswordDoesntMatchException extends ArgumentInvalidException {
  constructor() {
    super(`Password doesnt match error.`)
  }
}

export class UserAlreadyExistsError extends ConflictException {
  constructor(message = 'User already exists', code = 'USER.ALREADY_EXISTS') {
    super(message, code)
  }
}
