import { PostStatus } from '@src/modules/forum/domain/entity/post/types'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class FindPostsRequestDto {
  @IsBoolean()
  @IsOptional()
  readonly moderated?: boolean

  @IsString()
  @IsOptional()
  readonly status?: PostStatus
}
