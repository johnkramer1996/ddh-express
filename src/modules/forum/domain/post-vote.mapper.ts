import { injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { PostVoteResponseDto } from '../dtos/response.dto'
import { VoteEntity, VoteType } from './vote.entity'
import { PostVoteEntity, PostVoteModelAttributes } from './post-vote.envity'

@injectable()
export class PostVoteMapper implements Mapper<VoteEntity, PostVoteModelAttributes, PostVoteResponseDto> {
  public toPersistence(entity: VoteEntity): PostVoteModelAttributes {
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

  public toDomain(record: PostVoteModelAttributes): VoteEntity {
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

  public toResponse(entity: VoteEntity): PostVoteResponseDto {
    const copy = entity.getProps()
    return new PostVoteResponseDto(copy)
  }
}
