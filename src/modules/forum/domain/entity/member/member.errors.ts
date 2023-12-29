import { ForbiddenException } from '@src/shared/exceptions/exceptions'

export class MemberIsBannedError extends ForbiddenException {
  constructor(message = 'The member is banned', code = 'MEMBER.IS_BANNED') {
    super(message, code)
  }
}
