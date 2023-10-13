import { IsString, IsUUID } from 'class-validator'

export class UserLoginRequestDto {
  @IsString()
  readonly login!: string
}
