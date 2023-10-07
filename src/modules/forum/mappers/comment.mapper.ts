import { injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { CommentEntity } from '../domain/entity/comments/entity'
import { CommentModelAttributes } from '../domain/entity/comments/types'
import { CommentResponseDto } from '../dtos/comment/comment.response.dto'

@injectable()
export class CommentMapper implements Mapper<CommentEntity, CommentModelAttributes, CommentResponseDto> {
  public toPersistence(entity: CommentEntity): CommentModelAttributes {
    const copy = entity.getProps()
    const record: CommentModelAttributes = {
      id: copy.id,
      userId: copy.userId,
      postId: copy.postId,
      text: copy.text,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      deletedAt: copy.deletedAt,
    }
    return record
  }

  public toDomain(record: CommentModelAttributes): CommentEntity {
    const entity = new CommentEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        userId: record.userId,
        postId: record.postId,
        text: record.text,
        // votes: new Votes(),
        // user: record.user
        //   ? {
        //       email: record.user?.email,
        //       reputation: undefined,
        //     }
        //   : undefined,
      },
    })
    return entity
  }

  public toResponse(entity: CommentEntity): CommentResponseDto {
    const copy = entity.getProps()
    return new CommentResponseDto(copy)
  }
}
