import { IsString, IsUUID } from 'class-validator'

export class UserIdRequestDto {
  @IsString()
  @IsUUID()
  readonly userId!: string
}
