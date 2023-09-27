import { NotFoundException } from '@src/shared/exceptions/exceptions'

export class TodoNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Couldn't find a todo by id {${id}}.`)
  }
}
