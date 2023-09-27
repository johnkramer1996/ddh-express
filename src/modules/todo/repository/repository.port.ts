import { PaginatedQueryParams, RepositoryPort } from '../../../shared/domain/repository.port'
import { TodoAttributes } from '../../../shared/infra/database/sequelize/models/todo.model'
import { TodoEntity } from '../domain/todo.entity'

export interface FindTodosParams extends PaginatedQueryParams {
  readonly where: Partial<TodoAttributes>
}

export interface TodoRepositoryPort extends RepositoryPort<TodoEntity> {
  //   findOneByEmail(email: string): Promise<TodoEntity | null>
}
