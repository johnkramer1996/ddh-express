import { MaxLength, IsString, IsAlphanumeric, Matches, IsOptional, IsBoolean } from 'class-validator'

export class FindTodosRequestDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly text?: string

  @IsOptional()
  @IsBoolean()
  readonly completed?: boolean
}
