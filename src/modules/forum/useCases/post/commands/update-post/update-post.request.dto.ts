import { PostStatus } from '@src/modules/forum/domain/entity/post/post.types'
import { IsOptional, IsString } from 'class-validator'

export class PostUpdateRequestDto {
  @IsString()
  @IsOptional()
  readonly status?: PostStatus

  @IsString()
  @IsOptional()
  readonly title?: string

  @IsString()
  @IsOptional()
  readonly text?: string
}
