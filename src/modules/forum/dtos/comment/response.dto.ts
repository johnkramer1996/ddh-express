import { UserResponseDto } from '@src/modules/user/dtos/user.response.dto'
import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class CommentResponseDto extends ResponseBase {
  public readonly parentId: string | null
  public readonly text: string
  public readonly points: number
  public readonly childCount?: number
  public readonly wasUpvotedByMe?: boolean
  public readonly wasDownvotedByMe?: boolean
  public readonly user?: UserResponseDto
  public readonly children?: CommentResponseDto[]

  constructor(props: ResponseBaseProps<CommentResponseDto>) {
    super(props)
    this.parentId = props.parentId
    this.text = props.text
    this.points = props.points
    this.childCount = props.childCount
    this.wasUpvotedByMe = props.wasUpvotedByMe
    this.wasDownvotedByMe = props.wasDownvotedByMe
    this.user = props.user
    this.children = props.children
  }
}
