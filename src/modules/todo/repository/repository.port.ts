import { QueryParams, RepositoryPort } from '../../../shared/domain/repository.port'
import { TodoEntity } from '../domain/todo.entity'

export interface FindTodosParams extends QueryParams {
  // readonly where: Partial<TodoModelAttributes>
}

export interface TodoRepositoryPort extends RepositoryPort<TodoEntity> {}
