import { RepositoryPort } from '@src/shared/domain/repository.port'
import { MemberEntity } from '../../domain/entity/member/entity'

export interface MemberRepositoryPort extends RepositoryPort<MemberEntity> {
  findOneByUserIdIfExists(userId?: string): Promise<MemberEntity | null>
  findOneByUserId(userId: string): Promise<MemberEntity | null>
  findOneByLogin(login: string): Promise<MemberEntity | null>
}
