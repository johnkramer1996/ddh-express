import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class MemberResponseDto extends ResponseBase {
  public readonly reputation: number
  public readonly login?: string

  constructor(props: ResponseBaseProps<MemberResponseDto>) {
    super(props)
    this.reputation = props.reputation
    this.login = props.login
  }
}
