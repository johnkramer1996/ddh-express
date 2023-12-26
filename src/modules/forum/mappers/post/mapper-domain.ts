import { inject, injectable } from 'inversify'
import { Mapper } from '../../../../shared/domain/mapper.interface'
import { PostEntity } from '../../domain/entity/post/entity'
import { PostModelAttributes, PostType } from '../../domain/entity/post/types'
import { Slug } from '../../domain/value-objects/slug.value-object'
import { PostVotes, Votes } from '../../domain/value-objects/votes.value-objcect'
import { PostVoteMapper } from '../post-vote/mapper'
import { COMMENT_TYPES } from '../../di/comment/comment.types'
import { POST_VOTE_TYPES } from '../../di/post/post-vote.types'
import { CommentMapper } from '../comment/mapper-domain'
import { UserMapper } from '@src/modules/user/mappers/user/mapper-domain'
import { USER_TYPES } from '@src/modules/user/di/user.types'

@injectable()
export class PostMapper implements Mapper<PostEntity, PostModelAttributes> {
  constructor(
    @inject(COMMENT_TYPES.MAPPER) protected commentMapper: CommentMapper,
    @inject(USER_TYPES.MAPPER) protected userMapper: UserMapper,
    @inject(POST_VOTE_TYPES.MAPPER) protected postVoteMapper: PostVoteMapper
  ) {}

  public toPersistence(entity: PostEntity): PostModelAttributes {
    const copy = entity.getProps()
    const record: PostModelAttributes = {
      id: copy.id,
      memberId: copy.memberId,
      status: copy.status,
      type: copy.type,
      image: copy.image,
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

    const entity = new PostEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        memberId: record.memberId,
        status: record.status,
        type: record.type,
        image: record.image,
        title: record.title,
        text: record.text,
        link: record.link,
        slug: new Slug({ value: record.slug }),
        points: record.points,
        totalNumComments: record.totalNumComments,
        votes: new PostVotes(votes),
      },
    })
    return entity
  }
}
