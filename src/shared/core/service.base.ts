import { RepositoryPort } from '../domain/repository.port'
import { InternalServerErrorException } from '../exceptions/exceptions'
import { getStringFromUnknown } from '../utils/get-error'
import { Result, ResultWithError } from './result'

export abstract class ServiceBase<T1, T2> {
  constructor(protected commentRepo: RepositoryPort<any>) {}

  protected abstract executeImpl(param: T1): Promise<T2>

  public async execute(param: T1): Promise<ResultWithError<T2>> {
    try {
      return Result.ok(await this.executeImpl(param))
    } catch (err) {
      if (err instanceof Error) return Result.fail(err)
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
