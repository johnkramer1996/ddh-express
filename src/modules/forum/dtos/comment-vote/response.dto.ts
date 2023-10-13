import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class CommentVoteResponseDto extends ResponseBase {
  public readonly memberId: string
  public readonly commentId: string
  public readonly type: string

  constructor(props: ResponseBaseProps<CommentVoteResponseDto>) {
    super(props)
    this.memberId = props.memberId
    this.commentId = props.commentId
    this.type = props.type
  }
}
