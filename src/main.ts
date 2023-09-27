import 'reflect-metadata'
import './shared/utils/dotenv'
import { TYPES } from './shared/infra/di/types'
import { IServer } from './shared/infra/http/server'
import { PORT } from './configs/config'
import { container } from '@shared/infra/di/container'

import './modules/todo'
async function bootstrap() {
  const app = container.get<IServer>(TYPES.SERVER).create()

  app.listen(PORT, () => {
    console.log(`server started ON PORT ${PORT}`)
  })
}
bootstrap()
