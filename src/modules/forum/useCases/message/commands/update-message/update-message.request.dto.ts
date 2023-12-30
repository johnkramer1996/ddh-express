import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateMessageRequestDto {
  @IsString()
  @IsOptional()
  readonly message?: string

  @IsBoolean()
  @IsOptional()
  readonly isRead?: boolean
}
