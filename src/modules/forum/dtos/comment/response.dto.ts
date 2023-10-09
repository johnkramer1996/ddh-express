import { UserResponseDto } from '@src/modules/user/dtos/user.response.dto'
import { ResponseBase, ResponseBaseProps } from '../../../../shared/api/response.base'

export class CommentResponseDto extends ResponseBase {
  public readonly parentId: string | null
  public readonly text: string
  public readonly points: number
  public readonly wasUpvotedByMe?: boolean
  public readonly wasDownvotedByMe?: boolean
  public readonly user?: UserResponseDto

  constructor(props: ResponseBaseProps<CommentResponseDto>) {
    super(props)
    this.parentId = props.parentId
    this.text = props.text
    this.points = props.points
    this.wasUpvotedByMe = props.wasUpvotedByMe
    this.wasDownvotedByMe = props.wasDownvotedByMe
    this.user = props.user
  }
}
