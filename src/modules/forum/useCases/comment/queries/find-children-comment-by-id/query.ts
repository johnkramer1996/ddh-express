import { IQuery } from '@src/shared/core/cqs/query.interface'
import { FindChildrenCommentByIdServiceResponse as FindChildrenCommentByIdServiceResponse } from './service'

export class FindChildrenCommentByIdQuery implements IQuery<FindChildrenCommentByIdServiceResponse> {
  declare response?: FindChildrenCommentByIdServiceResponse
  readonly userId?: string
  readonly commentId: string

  constructor(props: FindChildrenCommentByIdQuery) {
    this.userId = props.userId
    this.commentId = props.commentId
  }
}
