import { inject, injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { CommentModelAdditionalAttribute, CommentModelAttributes } from '../../domain/entity/comments/types'
import { CommentResponseDto } from '../../dtos/comment/response.dto'
import { CommentVotes, PostVotes } from '../../domain/value-objects/votes.value-objcect'
import { COMMENT_VOTE_TYPES } from '../../di/comment/comment-vote.types'
import { CommentVoteMapper } from '../comment-vote/mapper'
import { MEMBER_TYPES } from '../../di/member/types'
import { MemberMapper } from '../member/mapper-domain'

@injectable()
export class CommentMapper implements Mapper<CommentEntity, CommentModelAttributes, CommentResponseDto> {
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

  public toDomain(record: CommentModelAdditionalAttribute): CommentEntity {
    const votes = record.votes ? record.votes.map(this.commentVoteMapper.toDomain.bind(this.commentVoteMapper)) : []
    const entity = new CommentEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        parentId: record.parentId,
        memberId: record.memberId,
        postId: record.postId,
        text: record.text,
        points: record.points,
        votes: new CommentVotes(votes),
        // member: record.member ? this.memberMapper.toDomain(record.member) : null,
        // childCount: record.childCount,
        // children: record.children?.map(this.toDomain.bind(this)),
      },
    })
    return entity
  }

  public toResponse(entity: CommentEntity): CommentResponseDto {
    throw new Error('toResponse CommentEntity not implement')
  }
}
