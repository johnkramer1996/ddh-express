import { IsString, IsUUID } from 'class-validator'

export class LoginRequestDto {
  @IsString()
  readonly login!: string
}
