import { repositoryConfig } from '@src/configs/config'
import { ObjectLiteral } from '../types/object-literal.type'

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

export type QueryParams = {
  limit: number
  page: number
  offset: number
  order: OrderBy[]
}

export type Include = { model: any; as: string; where?: any; required?: boolean; include?: Include[] }
export type Attribute = [string, string]
export type Where = ObjectLiteral

export interface IncludeStrategyPort {
  apply(): Include | Include[]
}

export interface AttributeStrategyPort {
  apply(): Attribute | Attribute[]
}

export interface WhereStrategyPort {
  apply(): Where
}

export type Options = {
  includeStrategies?: IncludeStrategyPort[]
  attributeStrategies?: AttributeStrategyPort[]
  where?: ObjectLiteral
}

export interface RepositoryPort<Entity> {
  findOne(options?: Options): Promise<Entity | null>
  findOneById(id: string, options?: Options): Promise<Entity | null>
  // findAll(options?: Options): Promise<Entity[]>
  // findAllPaginated(params: QueryParams, options?: Options): Promise<Paginated<Entity>>
  delete(entity: Entity, force?: boolean): Promise<void>
  exists(id: string): Promise<boolean>
  save(entity: Entity): Promise<void>
  saveBulk(entiries: Entity[]): Promise<any>
  deleteBulk(entiries: Entity[], force?: boolean): Promise<any>
}
