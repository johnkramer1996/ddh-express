import { IsString, IsOptional, IsEnum, ValidateIf, IsEmpty, IsUUID } from 'class-validator'

export class CreateCommentRequestDto {
  @IsString()
  readonly text!: string

  @IsOptional()
  @IsUUID()
  readonly parentId?: string
}
