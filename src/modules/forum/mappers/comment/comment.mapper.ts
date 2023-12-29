import { inject, injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { CommentEntity } from '../../domain/entity/comment/comment.entity'
import { CommentModelAttributes } from '../../domain/entity/comment/comment.types'
import { CommentVotes } from '../../domain/value-objects/votes.value-objcect'
import { COMMENT_VOTE_TYPES } from '../../di/comment/comment-vote.types'
import { CommentVoteMapper } from '../comment-vote/comment-vote.mapper'
import { MEMBER_TYPES } from '../../di/member/member.types'
import { MemberMapper } from '../member/mapper-domain'

@injectable()
export class CommentMapper implements Mapper<CommentEntity, CommentModelAttributes> {
  constructor(
    @inject(COMMENT_VOTE_TYPES.MAPPER) protected commentVoteMapper: CommentVoteMapper,
    @inject(MEMBER_TYPES.MAPPER) protected memberMapper: MemberMapper
  ) {}

  public toPersistence(entity: CommentEntity): CommentModelAttributes {
    const copy = entity.getProps()
    const record: CommentModelAttributes = {
      id: copy.id,
      parentId: copy.parentId,
      memberId: copy.memberId,
      postId: copy.postId,
      text: copy.text,
      points: copy.points,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      deletedAt: copy.deletedAt,
    }
    return record
  }

  public toDomain(record: CommentModelAttributes): CommentEntity {
    const votes = record.votes ? record.votes.map(this.commentVoteMapper.toDomain.bind(this.commentVoteMapper)) : []
    const entity = new CommentEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        parentId: record.parentId,
        memberId: record.memberId,
        postId: record.postId,
        text: record.text,
        points: record.points,
        votes: new CommentVotes(votes),
      },
    })
    return entity
  }
}
