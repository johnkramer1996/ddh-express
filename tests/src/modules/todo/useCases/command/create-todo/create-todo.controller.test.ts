import '@src/shared/utils/dotenv' // load jest
import { Result } from '@src/shared/core/result'
import { container } from '@src/shared/infra/di/container'
import { TYPES } from '@src/shared/infra/di/types'
import { IServer } from '@src/shared/infra/http/server'
import request from 'supertest'
import { CreateTodoService } from '@src/modules/todo/useCases/commands/create-todo/create-todo.service'
import { v4 } from 'uuid'
import { todoUrls } from '@src/configs/routes'

describe('Create Todo Controller', () => {
  const route = todoUrls.root + todoUrls.createOne
  const server = container.get<IServer>(TYPES.SERVER).create('/')
  const createTodoService = container.get<CreateTodoService>(CreateTodoService)

  beforeAll(async () => {})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /todos/new', () => {
    test('Should return data', async () => {
      //arrange
      const expectedData = { id: v4() }
      const payload = { text: 'new todo', completed: true }
      jest.spyOn(createTodoService, 'execute').mockResolvedValue(Result.ok(expectedData.id))

      //act
      const response = await request(server).post(route).send(payload)

      //assert
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expectedData)
    })

    test('Should return error message', async () => {
      //arrange
      const expectedData = { message: 'Error' }
      const payload = { text: 'new todo', completed: true }
      jest.spyOn(createTodoService, 'execute').mockResolvedValue(Result.fail(new Error(expectedData.message)))

      //act
      const response = await request(server).post(route).send(payload)

      //assert
      expect(response.status).toBe(500)
      expect(response.body).toStrictEqual(expectedData)
    })
  })
})
