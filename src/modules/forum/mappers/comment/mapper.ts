import { inject, injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { CommentEntity } from '../../domain/entity/comments/entity'
import { CommentModelAttributes } from '../../domain/entity/comments/types'
import { CommentResponseDto } from '../../dtos/comment/response.dto'
import { CommentVotes, PostVotes } from '../../domain/value-objects/votes.value-objcect'
import { COMMENT_VOTE_TYPES } from '../../di/comment/comment-vote.types'
import { CommentVoteMapper } from '../comment-vote/mapper'
import { USER_TYPES } from '@src/modules/user/di/user.types'
import { UserMapper } from '@src/modules/user/mappers/user.mapper'

@injectable()
export class CommentMapper implements Mapper<CommentEntity, CommentModelAttributes, CommentResponseDto> {
  constructor(@inject(COMMENT_VOTE_TYPES.MAPPER) protected commentVoteMapper: CommentVoteMapper, @inject(USER_TYPES.MAPPER) protected userMapper: UserMapper) {}

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

  public toDomain(record: CommentModelAttributes & { children?: CommentModelAttributes[] }): CommentEntity {
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
        user: record.user ? this.userMapper.toDomain(record.user) : null,
        childCount: record.childCount,
        children: record.children?.map(this.toDomain.bind(this)),
      },
    })
    return entity
  }

  public toResponse(entity: CommentEntity): CommentResponseDto {
    const copy = entity.getProps()

    return new CommentResponseDto({
      ...copy,
      childCount: copy.childCount,
      user: copy.user ? this.userMapper.toResponse(copy.user) : undefined,
      children: copy.children?.map(this.toResponse.bind(this)),
    })
  }

  public toResponseDetail(entity: CommentEntity): CommentResponseDto {
    const copy = entity.getProps()
    const voteEntities = copy.votes.getItems()

    return new CommentResponseDto({
      ...copy,
      user: copy.user ? this.userMapper.toResponse(copy.user) : undefined,
      wasUpvotedByMe: Boolean(voteEntities.find((v) => v.isUpvote())),
      wasDownvotedByMe: Boolean(voteEntities.find((v) => v.isDownvote())),
      childCount: copy.childCount,
      children: copy.children?.map(this.toResponseDetail.bind(this)),
    })
  }
}
