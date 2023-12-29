import { PostStatus, PostStatusEnum } from '@src/modules/forum/domain/entity/post/post.types'
import { IsEnum, IsString } from 'class-validator'

export class ModeratePostRequestDto {
  @IsEnum(PostStatusEnum, { message: `status must be one of the following values: ${PostStatusEnum.join(', ')}` })
  readonly status!: PostStatus
}
