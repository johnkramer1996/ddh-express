import { PostStatus, PostStatusEnum } from '@src/modules/forum/domain/entity/post/post.types'
import { IsString, IsEnum } from 'class-validator'

export class CreatePostRequestDto {
  @IsEnum(PostStatusEnum, { message: `status must be one of the following values: ${PostStatusEnum.join(', ')}` })
  readonly status!: PostStatus

  @IsString()
  readonly title!: string

  @IsString()
  readonly text!: string
}
