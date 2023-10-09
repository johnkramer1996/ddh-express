import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class CommentVoteResponseDto extends ResponseBase {
  public readonly userId: string
  public readonly commentId: string
  public readonly type: string

  constructor(props: ResponseBaseProps<CommentVoteResponseDto>) {
    super(props)
    this.userId = props.userId
    this.commentId = props.commentId
    this.type = props.type
  }
}
