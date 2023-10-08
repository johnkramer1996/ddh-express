import { IsString, IsUUID } from 'class-validator'

export class CommentIdRequestDto {
  @IsString()
  @IsUUID()
  readonly commentId!: string
}
