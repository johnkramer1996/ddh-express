import { IsString, IsUUID } from 'class-validator'

export class SlugRequestDto {
  @IsString()
  readonly slug!: string
}
