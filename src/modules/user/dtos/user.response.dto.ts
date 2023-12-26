import { ResponseBase, ResponseBaseProps } from '../../../shared/api/response.base'

type UserResponseDtoProps<T> = Omit<T, 'lastLogin'> & {
  lastLogin?: Date | null
}

export class UserResponseDto extends ResponseBase {
  public readonly permissions: string[]
  public readonly avatar: string | null
  public readonly login: string
  public readonly email: string
  public readonly firstName: string | null
  public readonly lastName: string | null
  public readonly country: string | null
  public readonly postalCode: string | null
  public readonly street: string | null
  public readonly isDeleted: boolean
  public readonly lastLogin: string | null
  public readonly posts?: any[]

  constructor(props: UserResponseDtoProps<ResponseBaseProps<UserResponseDto>>) {
    super(props)
    this.permissions = props.permissions
    this.avatar = props.avatar
    this.login = props.login
    this.email = props.email
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.country = props.country
    this.postalCode = props.postalCode
    this.street = props.street
    this.isDeleted = props.isDeleted
    this.lastLogin = props.lastLogin ? new Date(props.lastLogin).toISOString() : null
    this.posts = props.posts
  }
}
