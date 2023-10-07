import { IQuery } from '@src/shared/core/cqs/query.interface'
import { CommentFindAllServiceResponse } from './find-all.service'
import { PaginatedParams, PaginatedQueryBase } from '@src/shared/domain/query.base'

export class CommentFindAllQuery extends PaginatedQueryBase implements IQuery<CommentFindAllServiceResponse> {
  declare response?: CommentFindAllServiceResponse
  readonly slug: string

  constructor(props: PaginatedParams<CommentFindAllQuery>) {
    super(props)
    this.slug = props.slug
  }
}
