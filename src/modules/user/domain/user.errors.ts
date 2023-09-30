import { NotFoundException } from '@src/shared/exceptions/exceptions'

export class UserNotFoundException extends NotFoundException {
  constructor(value: string, field = 'id') {
    super(`Couldn't find a user by ${field} {${value}}.`)
  }
}
