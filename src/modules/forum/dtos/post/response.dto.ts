import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'
import { MemberResponseDto } from '../member/response.dto'

export class PostResponseDto extends ResponseBase {
  public readonly moderatedAt: Date | null
  public readonly memberId: string
  public readonly status: string
  public readonly slug: string
  public readonly title: string
  public readonly type: string
  public readonly image: string
  public readonly text: string | null
  public readonly member: MemberResponseDto | null
  // public readonly link: string | null
  public readonly totalNumComments: number
  public readonly points: number
  public readonly wasUpvotedByMe: boolean
  public readonly wasDownvotedByMe: boolean

  constructor(props: ResponseBaseProps<PostResponseDto>) {
    super(props)
    this.moderatedAt = props.moderatedAt
    this.memberId = props.memberId
    this.status = props.status
    this.slug = props.slug
    this.title = props.title
    this.type = props.type
    this.image = props.image
    this.text = props.text
    this.member = props.member
    // this.link = props.link
    this.points = props.points
    this.totalNumComments = props.totalNumComments
    this.wasUpvotedByMe = props.wasUpvotedByMe
    this.wasDownvotedByMe = props.wasDownvotedByMe
  }
}
