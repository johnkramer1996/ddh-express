import { inject, injectable } from 'inversify'
import { QueryMapper } from '../../../../shared/domain/mapper-query.interface'
import { PostResponseDto } from '../../dtos/post/response.dto'
import { PostQuery } from '../../domain/entity/post/query'
import { PostModelAttributes } from '../../domain/entity/post/types'
import { MemberQueryMapper } from '../member/mapper-query'
import { MEMBER_TYPES } from '../../di/member/types'
import { VoteType } from '../../domain/entity/vote.base.entity'

@injectable()
export class PostQueryMapper implements QueryMapper<PostQuery, PostModelAttributes, PostResponseDto> {
  constructor(@inject(MEMBER_TYPES.QUERY_MAPPER) protected memberMapper: MemberQueryMapper) {}

  public toQuery(record: PostModelAttributes): PostQuery {
    return new PostQuery({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      moderatedAt: record.moderatedAt,
      memberId: record.memberId,
      status: record.status,
      slug: record.slug,
      type: record.type,
      image: record.image,
      title: record.title,
      text: record.text,
      points: record.points,
      totalNumComments: record.totalNumComments,
      wasUpvotedByMe: Boolean(record.votes?.find((i) => i.type === VoteType.upvote)),
      wasDownvotedByMe: Boolean(record.votes?.find((i) => i.type === VoteType.downvote)),
      member: record.member ? this.memberMapper.toQuery(record.member) : null,
    })
  }

  public toResponse(query: PostQuery): PostResponseDto {
    return new PostResponseDto({
      id: query.id,
      createdAt: query.createdAt,
      updatedAt: query.updatedAt,
      moderatedAt: query.moderatedAt,
      memberId: query.memberId,
      status: query.status,
      slug: query.slug,
      type: query.type,
      image: query.image,
      text: query.text,
      title: query.title,
      points: query.points,
      totalNumComments: query.totalNumComments,
      wasUpvotedByMe: query.wasUpvotedByMe,
      wasDownvotedByMe: query.wasDownvotedByMe,
      member: query.member ? this.memberMapper.toResponse(query.member) : null,
    })
  }
}
