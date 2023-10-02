import 'reflect-metadata'
import './shared/utils/dotenv'
import { TYPES } from './shared/infra/di/types'
import { IServer } from './shared/infra/http/server'
import { PORT, envCongig } from './configs/config'
import './shared/infra/di/container'
import { container } from './shared/infra/di/container'

import './modules/todo'
import { USER_TYPES } from './modules/user/infra/di/types'
import { AuthServicePort } from './modules/user/services/auth.service.port'

async function bootstrap() {
  const app = container.get<IServer>(TYPES.SERVER).create()
  const redis = container.get<AuthServicePort>(USER_TYPES.AUTH_SERVICE)

  if (envCongig.isProduction) await redis.connect()
  await redis.connect()

  // await sequelize.sync({ alter: true })

  app.listen(PORT, () => {
    console.log(`server started ON PORT ${PORT}`)
  })
}
bootstrap()
