import '@src/shared/utils/dotenv' // load jest
import { TodoMapper } from '@src/modules/todo/domain/todo.mapper'
import { FindTodosService } from '@src/modules/todo/useCases/queries/find-todos/find-todos.service'
import { Paginated } from '@src/shared/domain/repository.port'
import { container } from '@src/shared/infra/di/container'
import { TYPES } from '@src/shared/infra/di/types'
import { mock, mockTodo } from '../../todos'
import { TodoRepositoryPort } from '@src/modules/todo/repository/repository.port'
import { FindTodosQuery } from '@src/modules/todo/useCases/queries/find-todos/find-todos.query'
import { TodoSequelizeRepository } from '@src/modules/todo/repository/repository'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'

type ExpectedData = Awaited<ReturnType<InstanceType<typeof TodoSequelizeRepository>['findAllPaginated']>>

describe('Find Todos Service', () => {
  container.rebind(TODO_TYPES.REPOSITORY).toConstantValue(mock.todoRepository)
  const findTodosService = container.get(FindTodosService)

  beforeAll(async () => {})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return pagination', async () => {
    //arrange
    const expectedData: ExpectedData = { data: mockTodo as any, count: 1, limit: 1, page: 1 }
    const query = new FindTodosQuery({ where: {} })
    mock.todoRepository.findAllPaginated.mockResolvedValue(expectedData)

    //act
    const response = await findTodosService.execute(query)

    //assert
    expect(response.getValue()).toEqual(expectedData)
  })
})
