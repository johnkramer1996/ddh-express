import { injectable } from 'inversify'
import { Mapper } from '../../../shared/domain/mapper.interface'
import { PostEntity } from './post.entity'
import { PostModelAttributes } from './post.types'
import { PostResponseDto } from '../dtos/response.dto'

@injectable()
export class PostMapper implements Mapper<PostEntity, PostModelAttributes, PostResponseDto> {
  public toPersistence(entity: PostEntity): PostModelAttributes {
    const copy = entity.getProps()
    const record: PostModelAttributes = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      text: copy.text,
    }
    return record
  }

  public toDomain(record: PostModelAttributes): PostEntity {
    const entity = new PostEntity({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        text: record.text,
        user: record.user,
      },
    })
    return entity
  }

  public toResponse(entity: PostEntity): PostResponseDto {
    const copy = entity.getProps()
    return new PostResponseDto(copy)
  }
}
