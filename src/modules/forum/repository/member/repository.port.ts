import { RepositoryPort } from '@src/shared/domain/repository.port'
import { MemberEntity } from '../../domain/entity/member/entity'

export interface MemberRepositoryPort extends RepositoryPort<MemberEntity> {
  findOneByUserId(userId: string): Promise<MemberEntity | null>
  findOneByLoginDetail(login: string): Promise<MemberEntity | null>
}
