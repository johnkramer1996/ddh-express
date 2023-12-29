import { Role } from '@src/modules/forum/domain/value-objects/role.value-object'
import { WatchedList } from '@src/shared/domain/watched-list'

export class Roles extends WatchedList<Role> {
  public compareItems(a: Role, b: Role): boolean {
    return a.equals(b)
  }
}
