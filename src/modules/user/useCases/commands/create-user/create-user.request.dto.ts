import { MaxLength, IsString, Matches, IsOptional, IsBoolean } from 'class-validator'

export class CreateUserRequestDto {
  @IsString()
  readonly email!: string

  @IsString()
  readonly password!: string
}
