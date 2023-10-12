import { IQuery } from '@src/shared/core/cqs/query.interface'
import { CommentFindAllServiceResponse } from './service'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'

export class CommentFindAllQuery extends PaginatedQueryBase implements IQuery<CommentFindAllServiceResponse> {
  declare response?: CommentFindAllServiceResponse
  readonly slug: string
  readonly userId?: string

  constructor(props: PaginatedParams<CommentFindAllQuery>) {
    super(props)
    this.slug = props.slug
    this.userId = props.userId
  }
}
