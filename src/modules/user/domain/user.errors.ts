import { ArgumentInvalidException } from '@src/shared/exceptions/exceptions'

export class PasswordDoesntMatchException extends ArgumentInvalidException {
  constructor() {
    super(`Password doesnt match error.`)
  }
}
