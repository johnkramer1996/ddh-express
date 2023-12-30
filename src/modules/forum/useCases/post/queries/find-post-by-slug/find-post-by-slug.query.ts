import { IQuery } from '@src/shared/core/cqs/query.interface'
import { FindPostBySlugServiceResponse } from './find-post-by-slug.service'

export class FindPostBySlugQuery implements IQuery<FindPostBySlugServiceResponse> {
  declare response?: FindPostBySlugServiceResponse
  readonly slug: string
  readonly userId?: string

  constructor(props: FindPostBySlugQuery) {
    this.slug = props.slug
    this.userId = props.userId
  }
}
