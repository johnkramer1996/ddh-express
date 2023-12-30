import { MemberRole, MemberRoleEnum } from '@src/modules/forum/domain/entity/member/member.types'
import { ValueObject } from '@src/shared/domain/value-object.base'
import { ArgumentInvalidException } from '@src/shared/exceptions/exceptions'

export interface RoleCreationProps {
  value: MemberRole
}

export interface RoleProps extends RoleCreationProps {}

export class Role extends ValueObject<RoleProps> {
  constructor(props: RoleProps) {
    super(props)
  }

  static create(create: RoleCreationProps) {
    const props: RoleProps = { ...create }
    return new Role(props)
  }

  get value(): MemberRole {
    return this.props.value
  }

  public equals(role: Role): boolean {
    return this.value === role.value
  }

  protected validate(props: RoleProps): void {
    if (!MemberRoleEnum.includes(props.value)) throw new ArgumentInvalidException(`Role must be one of the following values: ${MemberRoleEnum.join(', ')}`)
  }
}
