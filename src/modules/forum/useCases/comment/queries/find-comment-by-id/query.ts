import { IQuery } from '@src/shared/core/cqs/query.interface'
import { FindCommentByIdServiceResponse as FindCommentByIdServiceResponse } from './service'

export class FindCommentByIdQuery implements IQuery<FindCommentByIdServiceResponse> {
  declare response?: FindCommentByIdServiceResponse
  readonly userId?: string
  readonly commentId: string

  constructor(props: FindCommentByIdQuery) {
    this.userId = props.userId
    this.commentId = props.commentId
  }
}
