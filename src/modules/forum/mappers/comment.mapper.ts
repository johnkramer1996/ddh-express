import { inject, injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { CommentEntity } from '../domain/entity/comments/entity'
import { CommentModelAttributes } from '../domain/entity/comments/types'
import { CommentResponseDto } from '../dtos/comment/response.dto'
import { CommentVotes, PostVotes } from '../domain/value-objects/votes.value-objcect'
import { COMMENT_VOTE_TYPES } from '../di/types'
import { CommentVoteMapper } from './comment-vote.mapper'

@injectable()
export class CommentMapper implements Mapper<CommentEntity, CommentModelAttributes, CommentResponseDto> {
  constructor(@inject(COMMENT_VOTE_TYPES.MAPPER) protected commentVoteMapper: CommentVoteMapper) {}

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
    const votes = record.votes ? record.votes.map(this.commentVoteMapper.toDomain.bind(this.commentVoteMapper)) : []

    const entity = new CommentEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        userId: record.userId,
        postId: record.postId,
        text: record.text,
        votes: new CommentVotes(votes),
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

  public toResponseDetail(entity: CommentEntity): CommentResponseDto {
    const copy = entity.getProps()
    const voteEntities = copy.votes.getItems()

    return new CommentResponseDto({
      ...copy,
      wasUpvotedByMe: Boolean(voteEntities.find((v) => v.isUpvote())),
      wasDownvotedByMe: Boolean(voteEntities.find((v) => v.isDownvote())),
    })
  }
}

// const votes = copy.votes.getItems().map(this.commentVoteMapper.toResponse.bind(this.commentVoteMapper))
