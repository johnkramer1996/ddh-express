import { VoteType } from '@src/modules/forum/domain/entity/vote.base.entity'
import { IsEnum, IsString, IsUUID } from 'class-validator'

export class UpvoteRequestDto {
  @IsEnum(VoteType)
  readonly type!: VoteType
}
