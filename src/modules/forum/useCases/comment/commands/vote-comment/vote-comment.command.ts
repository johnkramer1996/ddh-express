import { ICommand } from '@src/shared/core/cqs/command.interface'
import { VoteCommentServiceResponse } from './vote-comment.service'
import { VoteType } from '@src/modules/forum/domain/entity/vote.base.entity'

export class VoteCommentCommand implements ICommand<VoteCommentServiceResponse> {
  declare response?: VoteCommentServiceResponse
  readonly userId: string
  readonly slug: string
  readonly commentId: string
  readonly type: VoteType

  constructor(props: VoteCommentCommand) {
    this.userId = props.userId
    this.slug = props.slug
    this.commentId = props.commentId
    this.type = props.type
  }
}
