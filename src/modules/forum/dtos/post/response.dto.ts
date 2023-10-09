import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'
import { PostVoteResponseDto } from '../post-vote/post-vote.response.dto'
import { UserResponseDto } from '@src/modules/user/dtos/user.response.dto'
import { CommentResponseDto } from '../comment/response.dto'

export class PostResponseDto extends ResponseBase {
  public readonly title: string
  public readonly type: string
  public readonly text: string | null
  public readonly link: string | null
  public readonly slug: string
  public readonly totalNumComments: number
  public readonly points: number
  // public readonly votes?: PostVoteResponseDto[]
  // public readonly comments?: CommentResponseDto[]
  public readonly wasUpvotedByMe?: boolean
  public readonly wasDownvotedByMe?: boolean
  public readonly user?: UserResponseDto

  constructor(props: ResponseBaseProps<PostResponseDto>) {
    super(props)
    this.title = props.title
    this.type = props.type
    this.text = props.text
    this.link = props.link
    this.slug = props.slug
    this.points = props.points
    this.totalNumComments = props.totalNumComments
    this.user = props.user
    this.wasUpvotedByMe = props.wasUpvotedByMe
    this.wasDownvotedByMe = props.wasDownvotedByMe
    // this.votes = props.votes
    // this.comments = props.comments
    // this.user = props.user
  }
}
