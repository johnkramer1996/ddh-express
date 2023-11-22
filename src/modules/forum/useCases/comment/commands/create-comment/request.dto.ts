import { IsString, IsOptional, IsEnum, ValidateIf, IsEmpty, IsUUID } from 'class-validator'

export class CommentCreateRequestDto {
  @IsString()
  @IsUUID()
  readonly text!: string

  // @IsOptional()
  @IsUUID()
  readonly parentId?: string
}
