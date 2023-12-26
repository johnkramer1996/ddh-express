import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class MessageResponseDto extends ResponseBase {
  public readonly fromMemberId: string
  public readonly toMemberId: string
  public readonly message: string
  public readonly isRead: boolean

  constructor(props: ResponseBaseProps<MessageResponseDto>) {
    super(props)
    this.fromMemberId = props.fromMemberId
    this.toMemberId = props.toMemberId
    this.message = props.message
    this.isRead = props.isRead
  }
}
