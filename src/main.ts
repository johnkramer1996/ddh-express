import 'reflect-metadata'
import './shared/utils/dotenv'
import { TYPES } from './shared/di/types'
import { IServer } from './shared/infra/http/server'
import { PORT, envCongig } from './configs/config'
import { container } from './shared/di/container'

import './modules/todo'
import { USER_TYPES } from './modules/user/di/user.types'
import { AuthServicePort } from './modules/user/services/auth.service.port'
import { sequelize } from './shared/infra/database/sequelize/config/connection'
import associate from './shared/infra/database/sequelize/models/accociate'
import { v4 } from 'uuid'
import CommentModel from './shared/infra/database/sequelize/models/comment.model'

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

  // const user = await UserModel.create({ email: 'vitalii@gmail.com', id: v4(), password: '12345' }, { raw: true })

  app.listen(PORT, () => {
    console.log(`server started ON PORT ${PORT}`)
  })
}
bootstrap()

// const a = sequelize.getQueryInterface().createTable()

// console.log('init')

//
//   console.log(user)
//   await CommentModel.create({ id: v4(), text: 'text', userId: user.id }, { raw: true })

//   const vitalii = await UserModel.findOne({
//     include: [{ as: 'comments', model: CommentModel }],
//     rejectOnEmpty: true,
//   })

//   console.log(vitalii.isEmailVerified)

//   // const comment = await CommentModel.findOne({
//   //   include: [{ as: 'user', model: UserModel }],
//   //   rejectOnEmpty: true,
//   // })

//   // console.log(comment.text)
//   // console.log(comment.user_id)

//   // console.log(console.log(user))
//   // AddressModel.create({ user_id: user.id })
