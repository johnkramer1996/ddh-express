import TodoModel from '@src/shared/infra/database/sequelize/models/todo.model'
import { v4 } from 'uuid'

export const todos = [
  { id: v4(), text: 'Todo 1', completed: true },
  { id: v4(), text: 'Todo 2', completed: false },
  { id: v4(), text: 'Todo 3', completed: false },
]

export const mockData = async () => {
  await TodoModel.destroy({ where: {}, truncate: true })
  return await Promise.all(todos.map(({ id, text, completed }) => TodoModel.create({ id, text, completed })))
}
