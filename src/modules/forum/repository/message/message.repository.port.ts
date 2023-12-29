import { Paginated, QueryParams, RepositoryPort, RepositoryQueryPort } from '@src/shared/domain/repository.port'
import { MessageEntity } from '../../domain/entity/message/entity'
import { MessageQuery } from '../../domain/entity/message/query'

export interface FindMessagesParams extends QueryParams {}

export interface MessageRepositoryPort extends RepositoryPort<MessageEntity> {}

export interface MessageRepositoryQueryPort extends RepositoryQueryPort<MessageQuery> {
  findAllPaginatedByFromMemberAndToMember(query: FindMessagesParams, fromMemberId: string, toMemberId: string): Promise<Paginated<MessageQuery>>
}
