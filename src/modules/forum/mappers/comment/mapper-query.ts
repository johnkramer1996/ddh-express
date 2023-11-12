import { inject, injectable } from 'inversify'
import { CommentModelAdditionalAttribute, CommentModelAttributes } from '../../domain/entity/comments/types'
import { CommentResponseDto } from '../../dtos/comment/response.dto'
import { COMMENT_VOTE_TYPES } from '../../di/comment/comment-vote.types'
import { CommentVoteMapper } from '../comment-vote/mapper'
import { MEMBER_TYPES } from '../../di/member/types'
import { CommentQuery } from '../../domain/entity/comments/query'
import { VoteType } from '../../domain/entity/vote.base.entity'
import { MemberQueryMapper } from '../member/mapper-query'

export interface QueryMapper<T1, T2, T3> {
  toQuery(record: any): T1
  toResponse(record: any): T3
}
@injectable()
export class CommentQueryMapper implements QueryMapper<CommentQuery, CommentModelAttributes, CommentResponseDto> {
  constructor(
    @inject(COMMENT_VOTE_TYPES.MAPPER) protected commentVoteMapper: CommentVoteMapper,
    @inject(MEMBER_TYPES.QUERY_MAPPER) protected memberMapper: MemberQueryMapper
  ) {}

  public toQuery(record: CommentModelAdditionalAttribute): CommentQuery {
    return new CommentQuery({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      text: record.text,
      parentId: record.parentId,
      points: record.points,
      countChild: record.countChild,
      wasUpvotedByMe: Boolean(record.votes?.find((i) => i.type === VoteType.upvote)),
      wasDownvotedByMe: Boolean(record.votes?.find((i) => i.type === VoteType.downvote)),
      member: this.memberMapper.toQuery(record.member),
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
      member: this.memberMapper.toResponse(query.member),
    })
  }
}
