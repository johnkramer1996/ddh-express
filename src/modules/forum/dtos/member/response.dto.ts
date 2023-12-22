import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class MemberResponseDto extends ResponseBase {
  public readonly reputation: number
  //  public readonly isBanned: boolean
  public readonly avatar: string | null
  public readonly login: string
  public readonly email: string

  constructor(props: ResponseBaseProps<MemberResponseDto>) {
    super(props)
    this.reputation = props.reputation
    //  this.isBanned = props.isBanned
    this.avatar = props.avatar
    this.login = props.login
    this.email = props.email
  }
}
