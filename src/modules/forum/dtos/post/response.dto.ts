import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class PostResponseDto extends ResponseBase {
  public readonly slug: string
  public readonly title: string
  public readonly type: string
  public readonly text: string | null
  // public readonly link: string | null
  // public readonly totalNumComments: number
  // public readonly points: number
  // public readonly wasUpvotedByMe?: boolean
  // public readonly wasDownvotedByMe?: boolean
  // public readonly user?: UserResponseDto
  // public readonly votes?: PostVoteResponseDto[]
  // public readonly comments?: CommentResponseDto[]

  constructor(props: ResponseBaseProps<PostResponseDto>) {
    super(props)
    this.slug = props.slug
    this.title = props.title
    this.type = props.type
    this.text = props.text
    // this.link = props.link
    // this.points = props.points
    // this.totalNumComments = props.totalNumComments
    // this.user = props.user
    // this.wasUpvotedByMe = props.wasUpvotedByMe
    // this.wasDownvotedByMe = props.wasDownvotedByMe
    // this.votes = props.votes
    // this.comments = props.comments
  }
}
