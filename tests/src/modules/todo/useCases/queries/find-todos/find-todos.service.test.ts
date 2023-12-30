import '@src/shared/utils/dotenv' // load jest
import { FindTodosService } from '@src/modules/todo/useCases/queries/find-todos/find-todos.service'
import { container } from '@src/shared/di/container'
import { mock, mockItems } from '../../todos'
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
    const expectedData: ExpectedData = { data: mockItems as any, count: 1, limit: 1, page: 1 }
    const query = new FindTodosQuery({ where: {} })
    mock.todoRepository.findAllPaginated.mockResolvedValue(expectedData)

    //act
    const response = await findTodosService.execute(query)

    //assert
    expect(response.getValue()).toEqual(expectedData)
  })
})
