import { ResponseBase, ResponseBaseProps } from '../../../shared/api/response.base'

export class UserResponseDto extends ResponseBase {
  public readonly email: string
  public readonly country: string | null
  public readonly street: string | null

  constructor(props: ResponseBaseProps<UserResponseDto>) {
    super(props)
    this.email = props.email
    this.country = props.country
    this.street = props.street
  }
}
