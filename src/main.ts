import 'reflect-metadata'
import './shared/utils/dotenv'
import { TYPES } from './shared/di/types'
import { IServer } from './shared/infra/http/server'
import { PORT, envCongig } from './configs/config'
import { container } from './shared/di/container'
import { USER_TYPES } from './modules/user/di/user.types'
import { AuthServicePort } from './modules/user/services/auth.service.port'
import associate from './shared/infra/database/sequelize/models/associate'
import path from 'path'
import './modules/forum'
import { ISocketServer } from './shared/infra/socket/server'
import PostModel from './shared/infra/database/sequelize/models/post.model'

const bootstrap = async () => {
  ;(global as any).__basedir = path.resolve(__dirname, '..')
  const app = container.get<IServer>(TYPES.SERVER).create()
  const redis = container.get<AuthServicePort>(USER_TYPES.AUTH_SERVICE)

  const server = app.listen(PORT, () => {
    console.info(`server started ON PORT ${PORT}`)
  })
  const socket = container.get<ISocketServer>(TYPES.SOCKET_SERVER).create(server)

  associate()
  try {
    socket.connect()
  } catch (e) {
    console.info('[socket]: connection error')
  }

  try {
    envCongig.isProduction
      ? await redis.connect()
      : redis.connect().catch(() => {
          console.info('[redis]: connection error')
        })
  } catch {
    console.info('[redis]: connection error')
  }
}
bootstrap()
