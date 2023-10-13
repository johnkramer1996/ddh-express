import { QueryParams, RepositoryPort } from '../../../shared/domain/repository.port'
import { UserEntity } from '../domain/user.entity'
import { UserModelAttributes } from '../domain/user.types'

export interface FindUsersParams extends QueryParams {
  // readonly where: Partial<UserModelAttributes>
}

export interface UserRepositoryPort extends RepositoryPort<UserEntity> {
  findOneByIdWithDeleted(id: string): Promise<UserEntity | null>
  findOneByEmailOrLogin(email: string, login: string): Promise<UserEntity | null>
  findOneByEmail(email: string): Promise<UserEntity | null>
  findOneByLogin(login: string): Promise<UserEntity | null>
  restore(entity: UserEntity): Promise<void>
}
