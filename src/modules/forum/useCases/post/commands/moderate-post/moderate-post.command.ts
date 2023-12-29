import { ICommand } from '@src/shared/core/cqs/command.interface'
import { ModeratePostServiceResponse as ModeratePostServiceResponse } from './moderate-post.service'
import { PostStatus } from '@src/modules/forum/domain/entity/post/post.types'

export class ModeratePostCommand implements ICommand<ModeratePostServiceResponse> {
  declare response?: ModeratePostServiceResponse
  readonly authUserId: string
  readonly slug: string
  readonly status: PostStatus

  constructor(props: ModeratePostCommand) {
    this.authUserId = props.authUserId
    this.slug = props.slug
    this.status = props.status
  }
}
