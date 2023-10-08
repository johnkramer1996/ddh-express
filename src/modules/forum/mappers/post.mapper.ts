import { inject, injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { PostEntity } from '../domain/entity/post/entity'
import { PostModelAttributes, PostType } from '../domain/entity/post/types'
import { PostResponseDto } from '../dtos/post/response.dto'
import { Slug } from '../domain/value-objects/slug.value-object'
import { PostVotes, Votes } from '../domain/value-objects/votes.value-objcect'
import { PostVoteMapper } from './post-vote.mapper'
import { COMMENT_TYPES, POST_VOTE_TYPES } from '../di/types'
import { CommentMapper } from './comment.mapper'
import { CommentResponseDto } from '../dtos/comment/response.dto'

@injectable()
export class PostMapper implements Mapper<PostEntity, PostModelAttributes, PostResponseDto> {
  constructor(@inject(COMMENT_TYPES.MAPPER) protected commentMapper: CommentMapper, @inject(POST_VOTE_TYPES.MAPPER) protected postVoteMapper: PostVoteMapper) {}

  public toPersistence(entity: PostEntity): PostModelAttributes {
    const copy = entity.getProps()
    const record: PostModelAttributes = {
      id: copy.id,
      userId: copy.userId,
      type: copy.type,
      title: copy.title,
      text: copy.text,
      link: copy.link,
      slug: copy.slug.value,
      points: copy.points,
      totalNumComments: copy.totalNumComments,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      deletedAt: copy.deletedAt,
    }
    return record
  }

  public toDomain(record: PostModelAttributes): PostEntity {
    const votes = record.votes ? record.votes.map(this.postVoteMapper.toDomain.bind(this.postVoteMapper)) : []
    const comments = record.comments ? record.comments.map(this.commentMapper.toDomain.bind(this.commentMapper)) : []

    const entity = new PostEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        userId: record.userId,
        type: record.type as PostType,
        title: record.title,
        text: record.text,
        link: record.link,
        slug: new Slug({ value: record.slug }),
        comments,
        points: record.points,
        totalNumComments: record.totalNumComments,
        votes: new PostVotes(votes),
        user: record.user
          ? {
              email: record.user?.email,
              reputation: undefined,
            }
          : undefined,
      },
    })
    return entity
  }

  public toResponse(entity: PostEntity): PostResponseDto {
    const copy = entity.getProps()
    const voteEntities = copy.votes.getItems()

    return new PostResponseDto({
      ...copy,
      slug: copy.slug.value,
    })
  }

  public toResponseDetail(entity: PostEntity): PostResponseDto {
    const copy = entity.getProps()
    const voteEntities = copy.votes.getItems()

    return new PostResponseDto({
      ...copy,
      slug: copy.slug.value,
      wasUpvotedByMe: Boolean(voteEntities.find((v) => v.isUpvote())),
      wasDownvotedByMe: Boolean(voteEntities.find((v) => v.isDownvote())),
    })
  }
}

// comments: copy.comments.map(this.commentMapper.toResponse.bind(this.commentMapper)),
