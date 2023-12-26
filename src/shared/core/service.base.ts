import { injectable } from 'inversify'
import { RepositoryPort } from '../domain/repository.port'
import { InternalServerErrorException } from '../exceptions/exceptions'
import { getStringFromUnknown } from '../utils/get-error'
import { Result, ResultWithError } from './result'
import { envCongig } from '@src/configs/config'
import { IncludeStrategyPort } from '../domain/repository.port'

@injectable()
export abstract class ServiceBase<T1, T2> {
  protected abstract executeImpl(param: T1): Promise<T2>

  public async execute(param: T1): Promise<ResultWithError<T2>> {
    try {
      return Result.ok(await this.executeImpl(param))
    } catch (err) {
      if (err instanceof Error) return Result.fail(err)
      if (envCongig.isDevelopment) console.error('[ServiceBase]')
      console.error(err)
      return Result.fail(new InternalServerErrorException(getStringFromUnknown(err)))
    }
  }
}
