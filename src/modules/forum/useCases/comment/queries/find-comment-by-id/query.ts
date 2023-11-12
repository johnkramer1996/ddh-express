import { IQuery } from '@src/shared/core/cqs/query.interface'
import { CommentFindByIdServiceResponse } from './service'

export class CommentFindByIdQuery implements IQuery<CommentFindByIdServiceResponse> {
  declare response?: CommentFindByIdServiceResponse
  readonly userId?: string
  readonly commentId: string

  constructor(props: CommentFindByIdQuery) {
    this.userId = props.userId
    this.commentId = props.commentId
  }
}
