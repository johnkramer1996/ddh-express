import { MaxLength, IsString, Matches, IsOptional, IsBoolean } from 'class-validator'

export class UpdateTodoRequestDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  readonly text?: string

  @IsOptional()
  @IsBoolean()
  readonly completed?: boolean
}
