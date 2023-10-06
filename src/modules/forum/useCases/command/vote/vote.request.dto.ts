import { VoteType } from '@src/modules/forum/domain/vote.entity'
import { IsEnum, IsString, IsUUID } from 'class-validator'

export class UpvoteRequestDto {
  @IsEnum(VoteType)
  readonly type!: VoteType
}
