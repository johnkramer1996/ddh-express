import '@src/shared/utils/dotenv' // load jest
import { container } from '@src/shared/infra/di/container'
import { TYPES } from '@src/shared/infra/di/types'
import { TodoRepositoryPort } from '@src/modules/todo/repository/repository.port'
import { CreateTodoService } from '@src/modules/todo/useCases/commands/create-todo/create-todo.service'
import { CreateTodoCommand } from '@src/modules/todo/useCases/commands/create-todo/create-todo.command'
import { Text } from '@src/modules/todo/domain/value-objects/text.value-object'
import { TodoEntity } from '@src/modules/todo/domain/todo.entity'
import { v4 } from 'uuid'
import { TODO_TYPES } from '@src/modules/todo/infra/di/types'

describe('Create Todo Service', () => {
  const todoRepository = container.get<TodoRepositoryPort>(TODO_TYPES.REPOSITORY)
  const findTodosService = container.get<CreateTodoService>(CreateTodoService)

  beforeAll(async () => {})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return created id', async () => {
    //arrange
    const expectedData = v4()
    const command = new CreateTodoCommand({ text: 'new todo' })
    const todoEntity = new TodoEntity({ id: expectedData, props: { text: new Text({ value: 'new todo' }), completed: true } })
    jest.spyOn(TodoEntity, 'create').mockReturnValue(todoEntity)
    jest.spyOn(todoRepository, 'save').mockResolvedValue()

    //act
    const response = await findTodosService.execute(command)

    //assert
    expect(response.getValue()).toEqual(expectedData)
    expect(todoRepository.save).toBeCalledTimes(1)
  })
})
