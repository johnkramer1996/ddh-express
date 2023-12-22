import { PostType } from '@src/modules/forum/domain/entity/post/types'
import { IsString, IsOptional, IsEnum, ValidateIf, IsEmpty, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export class CreatePostRequestDto {
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
