import { QueryParams, RepositoryPort } from '../../../shared/domain/repository.port'
import { UserModelAttributes, UserEntity } from '../domain/user.entity'

export interface FindTodosParams extends QueryParams {
  readonly where: Partial<UserModelAttributes>
}

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | null>
}
