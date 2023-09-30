import { MaxLength, IsString, IsAlphanumeric, Matches, IsOptional, IsBoolean } from 'class-validator'

export class CurrentUserRequestDto {
  readonly id!: string
}
