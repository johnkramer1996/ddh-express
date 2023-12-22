import { IsString } from 'class-validator'

export class CommentUpdateRequestDto {
  @IsString()
  readonly text?: string
}
