export class Paginated<T> {
  readonly count: number
  readonly limit: number
  readonly page: number
  readonly data: readonly T[]

  constructor(props: Paginated<T>) {
    this.count = props.count
    this.limit = props.limit
    this.page = props.page
    this.data = props.data
  }
}

export type OrderBy = [string, 'asc' | 'desc']

export type PaginatedQueryParams = {
  limit: number
  page: number
  offset: number
  order: OrderBy[]
}

export interface RepositoryPort<Entity> {
  findOneById(id: string): Promise<Entity | null>
  findAll(): Promise<Entity[]>
  findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<Entity>>
  delete(entity: Entity): Promise<boolean>
  exists(id: string): Promise<boolean>
  save(entity: Entity): Promise<void>

  // insert(entity: Entity | Entity[]): Promise<void>
  //   transaction<T>(handler: () => Promise<T>): Promise<T>
}
