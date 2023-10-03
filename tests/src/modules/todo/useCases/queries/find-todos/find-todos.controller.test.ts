import '@src/shared/utils/dotenv' // load jest
import { TodoPaginatedResponseDto } from '@src/modules/todo/dtos/todo.paginated.response.dto.ts'
import { Result } from '@src/shared/core/result'
import { container } from '@src/shared/infra/di/container'
import { TYPES } from '@src/shared/infra/di/types'
import { IServer } from '@src/shared/infra/http/server'
import request from 'supertest'
import { routes } from '@src/configs/routes'
import { mock, mockTodo } from '../../todos'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'
import { TodoMapper } from '@src/modules/todo/domain/todo.mapper'

describe('Find Todos Controller', () => {
  const route = routes.todo.findAll
  container.rebind(TYPES.QUERY_BUS).toConstantValue(mock.queryBus)
  const app = container.get<IServer>(TYPES.SERVER).create('/')
  const mapper = container.get<TodoMapper>(TODO_TYPES.MAPPER)

  beforeAll(async () => {})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return list items', async () => {
    //arrange
    const responseData = { data: mockTodo.map(mapper.toDomain), count: 1, limit: 1, page: 1 }
    const expectedData = new TodoPaginatedResponseDto({
      ...responseData,
      data: responseData.data.map(mapper.toResponse),
    })

    mock.queryBus.execute.mockResolvedValue(Result.ok(responseData))

    //act
    const response = await request(app).get(route)

    //assert
    expect(response.status).toBe(200)

    expect(response.body).toEqual(expectedData)
  })

  test('Should return 500 error with message', async () => {
    //arrange
    const expectedData = { message: 'Error' }
    mock.queryBus.execute.mockResolvedValue(Result.fail(new Error(expectedData.message)))

    //act
    const response = await request(app).get(route)

    //assert
    expect(response.status).toBe(500)
    expect(response.body).toStrictEqual(expectedData)
  })

  test('Should return 400 error', async () => {
    //arrange

    //act
    const response = await request(app).get(route).send({ text: true, completed: 'string' })

    //assert
    expect(response.status).toBe(400)
  })
})
