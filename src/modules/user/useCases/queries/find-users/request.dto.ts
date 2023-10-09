import { MaxLength, IsString, IsAlphanumeric, Matches, IsOptional, IsBoolean } from 'class-validator'

export class FindUsersRequestDto {
  @IsOptional()
  @IsString()
  readonly email?: string
}
