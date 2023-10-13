import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import Server, { IServer } from '../infra/http/server'
import HTTPRouter from '../infra/http/api/v1'
import todoModule from '@src/modules/todo/infra/di/container'
import userModule from '@src/modules/user/di/user.container'
import { QueryBus } from '@src/shared/core/cqs/query-bus'
import { CommandBus } from '@src/shared/core/cqs/command-bus'
import { AuthGuard } from '../infra/http/decorators/useGuard'
import postModule from '@src/modules/forum/di/post/post.container'
import commentModule from '@src/modules/forum/di/comment/comment.container'
import MemberModule from '@src/modules/forum/di/member/container'

const container = new Container({ defaultScope: 'Singleton', skipBaseClassChecks: true })
//

container.bind<IServer>(TYPES.SERVER).to(Server)
container.bind(TYPES.HTTP_ROUTER).to(HTTPRouter)
container.bind(TYPES.QUERY_BUS).to(QueryBus)
container.bind(TYPES.COMMAND_BUS).to(CommandBus)
container.bind(AuthGuard).toSelf()
container.bind(Container).toDynamicValue((ctx) => ctx.container as Container)

// todoModule(container)
userModule(container)
postModule(container)
commentModule(container)
MemberModule(container)

export { container }
