import { IsOptional, IsString } from 'class-validator'

export class PostUpdateRequestDto {
  @IsString()
  @IsOptional()
  readonly title?: string

  @IsString()
  @IsOptional()
  readonly text?: string
}
