import { MemberRole } from '@src/modules/forum/domain/entity/member/member.types'
import { ValueObject } from '@src/shared/domain/value-object.base'

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
    // TODO: CHECK IF ADMIN OR MEMBER
  }
}
