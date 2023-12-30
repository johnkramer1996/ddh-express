import { IsString, IsUUID } from 'class-validator'

export class CreateMessageRequestDto {
  @IsUUID()
  readonly toMemberId!: string

  @IsString()
  readonly message!: string
}
