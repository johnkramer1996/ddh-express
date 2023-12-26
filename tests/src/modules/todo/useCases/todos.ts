import { TodoModelAttributes } from '@src/modules/todo/domain/todo.types'
import { v4 } from 'uuid'

// TODO: ADD TESTS
export const mockTodo: TodoModelAttributes[] = [
  { id: v4(), text: 'Todo 1', completed: true, createdAt: new Date(), updatedAt: new Date() },
  { id: v4(), text: 'Todo 2', completed: false, createdAt: new Date(), updatedAt: new Date() },
  { id: v4(), text: 'Todo 3', completed: false, createdAt: new Date(), updatedAt: new Date() },
]

export const mock = {
  sequelizeModel: { findAndCountAll: jest.fn() },
  todoRepository: { findAllPaginated: jest.fn() },
  todoMapper: { toDomain: jest.fn() },
  queryBus: { execute: jest.fn() },
}
