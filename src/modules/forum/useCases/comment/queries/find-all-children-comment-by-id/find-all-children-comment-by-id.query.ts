import { IQuery } from '@src/shared/core/cqs/query.interface'
import { FindAllChildrenCommentByIdServiceResponse as FindAllChildrenCommentByIdServiceResponse } from './find-all-children-comment-by-id.service'

export class FindAllChildrenCommentByIdQuery implements IQuery<FindAllChildrenCommentByIdServiceResponse> {
  declare response?: FindAllChildrenCommentByIdServiceResponse
  readonly userId?: string
  readonly commentId: string

  constructor(props: FindAllChildrenCommentByIdQuery) {
    this.userId = props.userId
    this.commentId = props.commentId
  }
}
