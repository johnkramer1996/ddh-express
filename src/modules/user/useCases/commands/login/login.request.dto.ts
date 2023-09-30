import { IsString } from 'class-validator'

export class LoginRequestDto {
  @IsString()
  readonly email!: string

  @IsString()
  readonly password!: string
}
