import { UserAttributes } from '@src/shared/infra/database/sequelize/models/user.model'
import { QueryParams, RepositoryPort } from '../../../shared/domain/repository.port'
import { UserEntity } from '../domain/user.entity'

export interface FindTodosParams extends QueryParams {
  readonly where: Partial<UserAttributes>
}

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | null>
}
