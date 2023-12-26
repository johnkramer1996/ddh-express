import { RepositoryPort, RepositoryQueryPort } from '@src/shared/domain/repository.port'
import { MemberEntity } from '../../domain/entity/member/entity'
import { MemberQuery } from '../../domain/entity/member/query'

export interface MemberRepositoryPort extends RepositoryPort<MemberEntity> {
  findOneByUserIdIfExists(userId?: string): Promise<MemberEntity | null>
  findOneByUserId(userId: string): Promise<MemberEntity | null>
  findOneByLogin(login: string): Promise<MemberEntity | null>
}

export interface MemberRepositoryQueryPort extends RepositoryQueryPort<MemberQuery> {
  findOneByUserIdIfExists(userId?: string): Promise<MemberQuery | null>
  findOneByUserId(userId: string): Promise<MemberQuery | null>
  findOneByLogin(login: string): Promise<MemberQuery | null>
}
