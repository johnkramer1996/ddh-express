import { repositoryConfig } from '@src/configs/config'
import { OrderBy, QueryParams } from './repository.port'

/**
 * Base class for regular queries
 */
export abstract class QueryBase {}

/**
 * Base class for paginated queries
 */
export abstract class PaginatedQueryBase extends QueryBase {
  readonly limit: number
  readonly offset: number
  readonly page: number
  readonly order: OrderBy[]

  constructor(props: PaginatedParams<PaginatedQueryBase>) {
    super()
    this.limit = props.limit ?? repositoryConfig.limit
    this.offset = props.offset ?? (props.page ? (props.page - 1) * this.limit : 0)
    this.page = props.page ?? 1
    this.order = props.order && props.order.length ? props.order : [['createdAt', 'desc']]
  }
}

// Paginated query parameters
export type PaginatedParams<T> = Omit<T, 'limit' | 'offset' | 'order' | 'page'> & Partial<QueryParams>
