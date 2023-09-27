import { TodoAttributes } from '@src/shared/infra/database/sequelize/models/todo.model'
import { v4 } from 'uuid'

export const mockTodo: TodoAttributes[] = [
  { id: v4(), text: 'Todo 1', completed: true, createdAt: new Date(), updatedAt: new Date() },
  { id: v4(), text: 'Todo 2', completed: false, createdAt: new Date(), updatedAt: new Date() },
  { id: v4(), text: 'Todo 3', completed: false, createdAt: new Date(), updatedAt: new Date() },
]

export const mock = {
  sequelizeModel: { findAndCountAll: jest.fn() },
  todoRepository: { findAllPaginated: jest.fn() },
  todoMapper: { toDomain: jest.fn() },
  findTodosService: { execute: jest.fn() },
}
