import { injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { VoteType } from '../../domain/entity/vote.base.entity'
import { CommentVoteEntity } from '../../domain/entity/comment-vote/comment-vote.entity'
import { CommentVoteModelAttributes } from '../../domain/entity/comment-vote/comment-vote.types'

@injectable()
export class CommentVoteMapper implements Mapper<CommentVoteEntity, CommentVoteModelAttributes> {
  public toPersistence(entity: CommentVoteEntity): CommentVoteModelAttributes {
    const copy = entity.getProps()
    const record: CommentVoteModelAttributes = {
      id: copy.id,
      memberId: copy.memberId,
      commentId: copy.commentId,
      type: copy.type,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    }
    return record
  }

  public toDomain(record: CommentVoteModelAttributes): CommentVoteEntity {
    const entity = new CommentVoteEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        memberId: record.memberId,
        commentId: record.commentId,
        type: record.type as VoteType,
      },
    })
    return entity
  }
}
