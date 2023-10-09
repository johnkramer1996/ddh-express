import { repositoryConfig } from '@src/configs/config'

export class Paginated<T> {
  readonly count: number
  readonly limit: number
  readonly page: number
  readonly data: readonly T[]

  constructor(props: Partial<Paginated<T>>) {
    this.count = props.count ?? 0
    this.limit = props.limit ?? repositoryConfig.limit
    this.page = props.page ?? 1
    this.data = props.data ?? []
  }
}

export type OrderBy = [string, 'asc' | 'desc']

export type Where<Type> = {
  [Property in keyof Type]?: string | Type[Property]
}

export type QueryParams = {
  limit: number
  page: number
  offset: number
  order: OrderBy[]
}

export interface RepositoryPort<Entity> {
  findOneById(id: string, deleted?: boolean): Promise<Entity | null>
  findAll(): Promise<Entity[]>
  findAllPaginated(params: QueryParams): Promise<Paginated<Entity>>
  delete(entity: Entity, force?: boolean): Promise<boolean>
  exists(id: string): Promise<boolean>
  save(entity: Entity): Promise<void>
  saveBulk(entiries: Entity[]): Promise<any>
  deleteBulk(entiries: Entity[], force?: boolean): Promise<any>

  // insert(entity: Entity | Entity[]): Promise<void>
  //   transaction<T>(handler: () => Promise<T>): Promise<T>
}
