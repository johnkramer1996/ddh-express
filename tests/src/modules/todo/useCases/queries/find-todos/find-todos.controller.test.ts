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

describe('Find Todo Controller', () => {
  let todosModel: TodoModel[]
  const app = container.get<IServer>(TYPES.SERVER).create('/')
  const findTodosService = container.get<FindTodosService>(TYPES.FIND_TODOS_SERVICE)
  const mapper = container.get<TodoMapper>(TYPES.TODO_MAPPER)

  beforeAll(async () => {
    todosModel = await mockData()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /todos', () => {
    test('should return 200 with data', async () => {
      const responseData = new Paginated({ data: todosModel.map(mapper.toDomain), count: 1, limit: 1, page: 1 })
      const expectedData = new TodoPaginatedResponseDto(responseData)

      jest.spyOn(findTodosService, 'execute').mockResolvedValue(Result.ok(responseData))

      //act
      const response = await request(app).get('/todos')

      //assert
      expect(response.body).toEqual(expectedData)
    })

    test('GET /todos returns 500 on use case error', async () => {
      const expectedData = { message: 'Error' }

      jest.spyOn(findTodosService, 'execute').mockResolvedValue(Result.fail(new Error(expectedData.message)))

      const response = await request(app).get('/todos')

      //assert
      expect(response.status).toBe(500)
      expect(response.body).toStrictEqual(expectedData)
    })
  })
})
