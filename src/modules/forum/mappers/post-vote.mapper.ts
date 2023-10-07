import { injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { PostVoteResponseDto } from '../dtos/post-vote.response.dto'
import { VoteType } from '../domain/entity/vote.base.entity'
import { PostVoteEntity } from '../domain/entity/post-vote/entity'
import { PostVoteModelAttributes } from '../domain/entity/post-vote/types'

@injectable()
export class PostVoteMapper implements Mapper<PostVoteEntity, PostVoteModelAttributes, PostVoteResponseDto> {
  public toPersistence(entity: PostVoteEntity): PostVoteModelAttributes {
    const copy = entity.getProps()
    const record: PostVoteModelAttributes = {
      id: copy.id,
      userId: copy.userId,
      postId: copy.postId,
      type: copy.type,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    }
    return record
  }

  public toDomain(record: PostVoteModelAttributes): PostVoteEntity {
    const entity = new PostVoteEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        userId: record.userId,
        postId: record.postId,
        type: record.type as VoteType,
      },
    })
    return entity
  }

  public toResponse(entity: PostVoteEntity): PostVoteResponseDto {
    const copy = entity.getProps()
    return new PostVoteResponseDto(copy)
  }
}
