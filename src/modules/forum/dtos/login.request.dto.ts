import { IsString } from 'class-validator'

export class LoginRequestDto {
  @IsString()
  readonly login!: string
}
