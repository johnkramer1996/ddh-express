export interface SerializedException {
  message: string
  code: string
}

export abstract class ExceptionBase extends Error {
  abstract code: string

  constructor(readonly message: string) {
    super(message)
  }

  /**
   * By default in NodeJS Error objects are not
   * serialized properly when sending plain objects
   * to external processes. This method is a workaround.
   * Keep in mind not to return a stack trace to user when in production.
   * https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
   */
  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
    }
  }
}
