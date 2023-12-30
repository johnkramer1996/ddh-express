import { inject, injectable } from 'inversify'
import { CommentModelAttributes } from '../../domain/entity/comment/comment.types'
import { CommentResponseDto } from '../../dtos/comment/comment.response.dto'
import { COMMENT_VOTE_TYPES } from '../../di/comment/comment-vote.types'
import { CommentVoteMapper } from '../comment-vote/comment-vote.mapper'
import { MEMBER_TYPES } from '../../di/member/member.types'
import { CommentQuery } from '../../domain/entity/comment/comment.query'
import { MemberQueryMapper } from '../member/mapper-query'
import { QueryMapper } from '../../../../shared/domain/mapper-query.interface'

@injectable()
export class CommentQueryMapper implements QueryMapper<CommentQuery, CommentModelAttributes, CommentResponseDto> {
  constructor(
    @inject(COMMENT_VOTE_TYPES.MAPPER) protected commentVoteMapper: CommentVoteMapper,
    @inject(MEMBER_TYPES.QUERY_MAPPER) protected memberMapper: MemberQueryMapper
  ) {}

  public toQuery(record: CommentModelAttributes): CommentQuery {
    return new CommentQuery({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      text: record.text,
      parentId: record.parentId,
      points: record.points,
      countChild: Number(record.countChild) ?? 0,
      wasUpvotedByMe: Boolean(record.votes?.find((i) => i.type === 'upvote')),
      wasDownvotedByMe: Boolean(record.votes?.find((i) => i.type === 'downvote')),
      member: record.member ? this.memberMapper.toQuery(record.member) : null,
    })
  }

  public toResponse(query: CommentQuery): CommentResponseDto {
    return new CommentResponseDto({
      id: query.id,
      createdAt: query.createdAt,
      updatedAt: query.updatedAt,
      text: query.text,
      parentId: query.parentId,
      points: query.points,
      countChild: query.countChild,
      wasUpvotedByMe: query.wasUpvotedByMe,
      wasDownvotedByMe: query.wasDownvotedByMe,
      member: query.member ? this.memberMapper.toResponse(query.member) : null,
    })
  }
}
