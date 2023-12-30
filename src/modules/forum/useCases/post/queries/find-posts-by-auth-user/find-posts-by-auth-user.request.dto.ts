import { PostStatus, PostStatusEnum } from '@src/modules/forum/domain/entity/post/post.types'
import { PaginatedQueryRequestDto } from '@src/shared/api/paginated-query.request.dto'
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'

export class FindPostByAuthUserPaginatedQueryRequestDto extends PaginatedQueryRequestDto {
  @IsEnum(PostStatusEnum, { message: `status must be one of the following values: ${PostStatusEnum.join(', ')}` })
  @IsOptional()
  readonly status?: PostStatus

  @IsUUID()
  @IsOptional()
  readonly memberId?: string
}
