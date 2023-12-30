import { IsString } from 'class-validator'

export class CreateUserRequestDto {
  @IsString()
  readonly login!: string

  @IsString()
  readonly email!: string

  @IsString()
  readonly password!: string
}
