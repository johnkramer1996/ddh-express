import { UserPermission } from '@src/shared/core/jwt'
import { ValueObject } from '@src/shared/domain/value-object.base'

export interface PermissionCreationProps {
  value: UserPermission
}

export interface PermissionProps extends PermissionCreationProps {}

export class Permission extends ValueObject<PermissionProps> {
  constructor(props: PermissionProps) {
    super(props)
  }

  static create(create: PermissionCreationProps) {
    const props: PermissionProps = { ...create }
    return new Permission(props)
  }

  get value(): UserPermission {
    return this.props.value
  }

  protected validate(props: PermissionProps): void {
    // TODO: CHECK IF ADMIN OR MEMBER
  }
}
