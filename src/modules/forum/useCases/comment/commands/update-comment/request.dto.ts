import { MaxLength, IsString, Matches, IsOptional, IsBoolean } from 'class-validator'

export class CommentUpdateRequestDto {
  @IsString()
  readonly text?: string
}
