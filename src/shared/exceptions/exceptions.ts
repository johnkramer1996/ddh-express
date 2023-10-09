import { ARGUMENT_INVALID, ARGUMENT_NOT_PROVIDED, ARGUMENT_OUT_OF_RANGE, CONFLICT, FORBIDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } from './exception.codes'
import { ExceptionBase } from './exception.base'

export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ARGUMENT_INVALID
}

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ARGUMENT_NOT_PROVIDED
}

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ARGUMENT_OUT_OF_RANGE
}

export class ConflictException extends ExceptionBase {
  static readonly message = 'Conflict'

  constructor(message = ConflictException.message, readonly code = CONFLICT) {
    super(message)
  }
}

export class ForbiddenException extends ExceptionBase {
  static readonly message = 'Not access'

  constructor(message = ForbiddenException.message, readonly code = FORBIDEN) {
    super(message)
  }
}

export class NotFoundException extends ExceptionBase {
  static readonly message = 'Not found'

  constructor(message = NotFoundException.message, readonly code = NOT_FOUND) {
    super(message)
  }
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {ExceptionBase}
 */
export class InternalServerErrorException extends ExceptionBase {
  static readonly message = 'Internal server error'

  constructor(message = InternalServerErrorException.message, readonly code = INTERNAL_SERVER_ERROR) {
    super(message)
  }
}
