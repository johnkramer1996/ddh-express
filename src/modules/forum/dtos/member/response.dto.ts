import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class MemberResponseDto extends ResponseBase {
  public readonly reputation: number
  public readonly avatar: string | null
  public readonly login: string
  public readonly email: string
  public readonly isOnline: boolean
  public readonly isBanned: boolean

  constructor(props: ResponseBaseProps<MemberResponseDto>) {
    super(props)
    this.reputation = props.reputation
    this.avatar = props.avatar
    this.login = props.login
    this.email = props.email
    this.isOnline = props.isOnline
    this.isBanned = props.isBanned
  }
}
