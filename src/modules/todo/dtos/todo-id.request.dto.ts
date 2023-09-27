import { IsString, IsUUID } from 'class-validator'

export class TodoIdRequestDto {
  @IsString()
  @IsUUID()
  readonly todoId!: string
}
