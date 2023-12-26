import { QueryParams, RepositoryPort, RepositoryQueryPort } from '../../../shared/domain/repository.port'
import { UserEntity } from '../domain/user.entity'
import { UserQuery } from '../domain/user.query'

export interface FindUsersParams extends QueryParams {}

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByEmailOrLogin(email: string, login: string): Promise<UserEntity | null>
  findOneByEmail(email: string): Promise<UserEntity | null>
  findOneByLogin(login: string): Promise<UserEntity | null>
}

export interface UserRepositoryQueryPort extends RepositoryQueryPort<UserQuery> {
  findOneByLogin(login: string): Promise<UserQuery | null>
}
