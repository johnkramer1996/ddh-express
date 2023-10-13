import 'reflect-metadata'
import './shared/utils/dotenv'
import { TYPES } from './shared/di/types'
import { IServer } from './shared/infra/http/server'
import { PORT, envCongig } from './configs/config'
import { container } from './shared/di/container'
import { USER_TYPES } from './modules/user/di/user.types'
import { AuthServicePort } from './modules/user/services/auth.service.port'
import associate from './shared/infra/database/sequelize/models/associate'
import './modules/forum'

async function bootstrap() {
  const app = container.get<IServer>(TYPES.SERVER).create()
  const redis = container.get<AuthServicePort>(USER_TYPES.AUTH_SERVICE)

  try {
    envCongig.isProduction
      ? await redis.connect()
      : redis.connect().catch((e) => {
          console.log('[redis]: connection error')
        })
  } catch {
    console.log('[redis]: connection error')
  }

  associate()
  // await sequelize.sync({ force: true, alter: true })

  app.listen(PORT, () => {
    console.log(`server started ON PORT ${PORT}`)
  })
}
bootstrap()
