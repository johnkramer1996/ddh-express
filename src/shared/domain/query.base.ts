import { OrderBy, PaginatedQueryParams } from './repository.port'

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
    this.limit = props.limit ?? 15
    this.offset = props.page ? (props.page - 1) * this.limit : 1
    this.page = props.page ?? 1
    this.order = props.order && props.order.length ? props.order : [['id', 'desc']]
  }
}

// Paginated query parameters
export type PaginatedParams<T> = Omit<T, 'limit' | 'offset' | 'order' | 'page'> & Partial<Omit<PaginatedQueryParams, 'offset'>>
