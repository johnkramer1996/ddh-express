import { IsOptional, IsString, ValidateIf } from 'class-validator'
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

export class UpdateUserRequestDto {
  @IsString()
  @IsOptional()
  readonly login?: string

  @IsString()
  @IsOptional()
  readonly email?: string

  @IsString()
  @IsOptional()
  readonly password?: string

  @IsString()
  @ValidateIf((o) => o.password)
  readonly passwordConfirm?: string

  @IsString()
  @IsOptional()
  readonly avatar?: string

  @IsString()
  @IsOptional()
  readonly firstName?: string

  @IsString()
  @IsOptional()
  readonly lastName?: string
}
