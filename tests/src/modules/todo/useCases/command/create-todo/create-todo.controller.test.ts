import '@src/shared/utils/dotenv' // load jest
import { TodoMapper } from '@src/modules/todo/domain/todo.mapper'
import { TodoPaginatedResponseDto } from '@src/modules/todo/dtos/todo.paginated.response.dto.ts'
import { FindTodosService } from '@src/modules/todo/useCases/queries/find-todos/find-todos.service'
import { Result } from '@src/shared/core/result'
import { Paginated } from '@src/shared/domain/repository.port'
import TodoModel from '@src/shared/infra/database/sequelize/models/todo.model'
import { container } from '@src/shared/infra/di/container'
import { TYPES } from '@src/shared/infra/di/types'
import { IServer } from '@src/shared/infra/http/server'
import request from 'supertest'
import { mockData } from '../../todos'
import { CreateTodoService } from '@src/modules/todo/useCases/commands/create-todo/create-todo.service'
import { v4 } from 'uuid'
import { todoUrls } from '@src/configs/routes'

describe('Create Todo Controller', () => {
  // let todosModel: TodoModel[]
  const server = container.get<IServer>(TYPES.SERVER).create('/')
  const createTodoService = container.get<CreateTodoService>(TYPES.CREATE_TODO_SERVICE)
  const mapper = container.get<TodoMapper>(TYPES.TODO_MAPPER)

  beforeAll(async () => {
    // todosModel = await mockData()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // TODO" run text acreoss vs code

  describe('POST /todos', () => {
    test('POST /todos', async () => {
      //arrange
      const payload = { text: 'new todo', completed: true }
      const uuid = v4()
      jest.spyOn(createTodoService, 'execute').mockResolvedValue(Result.ok(uuid))

      //act
      const response = await request(server).post(todoUrls.createOne).send(payload)

      //assert
      expect(response.status).toBe(201)
      expect(response.body).toEqual({ id: uuid })
    })

    test('POST /todos returns 500', async () => {
      //arrange
      const expectedData = { message: 'Error' }
      const payload = { text: 'new todo', completed: true }
      jest.spyOn(createTodoService, 'execute').mockRejectedValue(Promise.reject(Error('Error')))

      //act
      const response = await request(server).post(todoUrls.createOne).send(payload)

      //assert
      expect(response.status).toBe(500)
      expect(response.body).toStrictEqual(expectedData)
    })
  })
})
