import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class FindTodosRequestDto {
  @IsOptional()
  @IsString()
  readonly text?: string

  @IsOptional()
  @IsBoolean()
  readonly completed?: boolean
}
