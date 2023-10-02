import { ResponseBase, ResponseBaseProps } from '../../../shared/api/response.base'

type UserResponseDtoProps<T> = Omit<T, 'lastLogin'> & {
  lastLogin: Date | null
}

export class UserResponseDto extends ResponseBase {
  public readonly email: string
  public readonly country: string | null
  public readonly postalCode: string | null
  public readonly street: string | null
  public readonly lastLogin: string | null

  constructor(props: UserResponseDtoProps<ResponseBaseProps<UserResponseDto>>) {
    super(props)
    this.email = props.email
    this.country = props.country
    this.postalCode = props.postalCode
    this.street = props.street
    this.lastLogin = props.lastLogin ? new Date(props.lastLogin).toISOString() : props.lastLogin
  }
}
