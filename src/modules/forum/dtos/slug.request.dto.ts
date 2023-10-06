import { IsString } from 'class-validator'

export class SlugRequestDto {
  @IsString()
  readonly slug!: string
}
