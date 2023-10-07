import { IsString, IsOptional, IsEnum, ValidateIf, IsEmpty } from 'class-validator'
import { PostType } from '../../../domain/entity/post/types'

export class CreateOneRequestDto {
  @IsEnum(PostType)
  readonly type!: PostType

  @IsString()
  readonly title!: string

  @ValidateIf((o) => o.type === PostType.text)
  @IsString()
  readonly text!: string

  @ValidateIf((o) => o.type === PostType.link)
  @IsString()
  readonly link!: string
}
