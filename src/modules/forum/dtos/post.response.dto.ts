import { ResponseBase, ResponseBaseProps } from '../../../shared/api/response.base'

export class PostResponseDto extends ResponseBase {
  public readonly title: string
  public readonly type: string
  public readonly text: string | null
  public readonly link: string | null
  public readonly slug: string
  public readonly totalNumComments: number
  public readonly points: number
  public readonly user?: any

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
  }
}
