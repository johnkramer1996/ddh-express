import { injectable } from 'inversify'
import { MemberModelAttributes, MemberModelWithAdditonAttributes } from '../../domain/entity/member/types'
import { QueryMapper } from '../comment/mapper-query'
import { PostResponseDto } from '../../dtos/post/response.dto'
import { PostQuery } from '../../domain/entity/post/query'
import { PostModelAttributes } from '../../domain/entity/post/types'

@injectable()
export class PostQueryMapper implements QueryMapper<PostQuery, PostModelAttributes, PostResponseDto> {
  public toQuery(record: PostModelAttributes): PostQuery {
    return new PostQuery({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      slug: record.slug,
      type: record.type,
      title: record.title,
      text: record.text,
    })
  }

  public toResponse(query: PostQuery): PostResponseDto {
    return new PostResponseDto({
      id: query.id,
      createdAt: query.createdAt,
      updatedAt: query.updatedAt,
      slug: query.slug,
      type: query.type,
      text: query.text,
      title: query.title,
    })
  }
}
