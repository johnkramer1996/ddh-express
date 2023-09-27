import '@src/shared/utils/dotenv' // load jest
import { container } from '@src/shared/infra/di/container'
import { TYPES } from '@src/shared/infra/di/types'
import { TodoRepositoryPort } from '@src/modules/todo/repository/repository.port'
import { FindTodosQuery } from '@src/modules/todo/useCases/queries/find-todos/find-todos.query'
import { mock, mockTodo } from '../useCases/todos'
import { repositoryConfig } from '@src/configs/config'

// type myType =

describe('Todo Repository', () => {
  container.rebind(TYPES.TODO_SEQUELIZE_MODEL).toConstantValue(mock.sequelizeModel)
  container.rebind(TYPES.TODO_MAPPER).toConstantValue(mock.todoMapper)
  const todoRepository = container.get<TodoRepositoryPort>(TYPES.TODO_REPOSITORY)

  beforeAll(async () => {})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return todo list with pagination', async () => {
    //arrange
    const expectedData: Awaited<ReturnType<typeof todoRepository.findAllPaginated>> = {
      data: mockTodo.map((_, i) => i) as any,
      count: mockTodo.length,
      limit: repositoryConfig.limit,
      page: 1,
    }
    mock.sequelizeModel.findAndCountAll.mockResolvedValue({ rows: expectedData.data, count: expectedData.count })
    mock.todoMapper.toDomain.mockImplementation((i) => i)
    const params = new FindTodosQuery({ where: {} })

    //act
    const response = await todoRepository.findAllPaginated(params)

    //assert
    expect(response).toEqual(expectedData)
    expect(mock.sequelizeModel.findAndCountAll).toHaveBeenCalled()
    expect(mock.todoMapper.toDomain).toBeCalledTimes(expectedData.data.length)
  })
})
