import { MaxLength, IsString, Matches, IsOptional, IsBoolean } from 'class-validator'

export class CommentUpdateRequestDto {
  @IsOptional()
  @IsString()
  readonly text?: string
}
