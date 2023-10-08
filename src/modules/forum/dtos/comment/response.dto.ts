import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'
import { CommentVoteResponseDto } from '../comment-vote/comment-vote.response.dto'

export class CommentResponseDto extends ResponseBase {
  public readonly text: string
  // public readonly votes?: CommentVoteResponseDto[]
  public readonly user?: any
  public readonly wasUpvotedByMe?: boolean
  public readonly wasDownvotedByMe?: boolean

  constructor(props: ResponseBaseProps<CommentResponseDto>) {
    super(props)
    this.text = props.text
    // this.votes = props.votes
    this.user = props.user
    this.wasUpvotedByMe = props.wasUpvotedByMe
    this.wasDownvotedByMe = props.wasDownvotedByMe
  }
}
