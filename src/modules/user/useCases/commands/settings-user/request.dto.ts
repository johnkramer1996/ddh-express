import { IsOptional, IsString, ValidateIf } from 'class-validator'
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

export class SettingsUserRequestDto {
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
  // TODO: MATCH PASSWORD
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

// export function Match(property: string, validationOptions?: ValidationOptions) {
//   return (object: any, propertyName: string) => {
//     registerDecorator({
//       target: object.constructor,
//       propertyName,
//       options: validationOptions,
//       constraints: [property],
//       validator: MatchConstraint,
//     })
//   }
// }

// @ValidatorConstraint({ name: 'Match' })
// export class MatchConstraint implements ValidatorConstraintInterface {
//   validate(value: any, args: ValidationArguments) {
//     const [relatedPropertyName] = args.constraints
//     const relatedValue = (args.object as any)[relatedPropertyName]
//     return value === relatedValue
//   }
// }
