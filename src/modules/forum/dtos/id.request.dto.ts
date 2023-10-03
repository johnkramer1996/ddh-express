import { IsString, IsUUID } from 'class-validator'

export class PostIdRequestDto {
  @IsString()
  @IsUUID()
  readonly postId!: string
}
