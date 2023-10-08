import { IQuery } from '@src/shared/core/cqs/query.interface'
import { FindBySlugServiceResponse } from './find-by-slug.service'

export class FindBySlugQuery implements IQuery<FindBySlugServiceResponse> {
  declare response?: FindBySlugServiceResponse
  readonly slug: string
  readonly userId?: string

  constructor(props: FindBySlugQuery) {
    this.slug = props.slug
    this.userId = props.userId
  }
}
