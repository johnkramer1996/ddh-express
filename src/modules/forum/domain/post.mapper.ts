import { injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { PostEntity } from './post.entity'
import { PostModelAttributes, PostType } from './post.types'
import { PostResponseDto } from '../dtos/response.dto'

@injectable()
export class PostMapper implements Mapper<PostEntity, PostModelAttributes, PostResponseDto> {
  public toPersistence(entity: PostEntity): PostModelAttributes {
    const copy = entity.getProps()
    const record: PostModelAttributes = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      type: copy.type,
      title: copy.title,
      text: copy.text,
      link: copy.link,
      slug: copy.slug,
      points: copy.points,
      totalNumComments: copy.totalNumComments,
    }
    return record
  }

  public toDomain(record: PostModelAttributes): PostEntity {
    const entity = new PostEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        type: record.type as PostType,
        title: record.title,
        text: record.text,
        link: record.link,
        user: record.user,
        slug: record.slug,
        points: record.points,
        totalNumComments: record.totalNumComments,
      },
    })
    return entity
  }

  public toResponse(entity: PostEntity): PostResponseDto {
    const copy = entity.getProps()
    return new PostResponseDto(copy)
  }
}
