import { Paginated } from '../domain/repository.port'

export abstract class PaginatedResponseDto<T> extends Paginated<T> {}
