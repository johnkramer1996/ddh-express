import { IsString, IsOptional, IsEnum } from 'class-validator'
import { PostType } from '../../domain/post.types'

export class CreateOneRequestDto {
  @IsEnum(PostType)
  readonly type!: PostType

  @IsString()
  readonly title!: string

  @IsOptional()
  @IsString()
  readonly text?: string

  @IsOptional()
  @IsString()
  readonly link?: string
}
