import { QueryParams, RepositoryPort } from '../../../shared/domain/repository.port'
import { UserEntity } from '../domain/user.entity'
import { UserModelAttributes } from '../domain/user.types'

export interface FindTodosParams extends QueryParams {
  readonly where: Partial<UserModelAttributes>
}

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | null>
}
