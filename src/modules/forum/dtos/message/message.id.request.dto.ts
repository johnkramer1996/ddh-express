import { IsString, IsUUID } from 'class-validator'

export class MessageIdRequestDto {
  @IsString()
  @IsUUID()
  readonly messageId!: string
}
