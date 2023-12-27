import { PostStatus } from '@src/modules/forum/domain/entity/post/types'
import { IsString } from 'class-validator'

export class ModeratePostRequestDto {
  @IsString()
  readonly status!: PostStatus
}
