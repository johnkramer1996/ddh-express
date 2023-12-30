import { Container } from 'inversify'
import { MESSAGE_TYPES } from './message.types'
import { MessageMapper } from '../../mappers/message/message.mapper'
import { MessageQueryMapper } from '../../mappers/message/message.mapper-query'
import { MessageModel } from '@src/shared/infra/database/sequelize/models/message.model'
import { MessageRepositoryPort, MessageRepositoryQueryPort } from '../../repository/message/message.repository.port'
import { MessageSequelizeRepository } from '../../repository/message/message.repository.sequelize'
import { MessageSequelizeRepositoryQuery } from '../../repository/message/message.repository.query.sequelize'
import { CreateMessageController } from '../../useCases/message/commands/create-message/create-message.controller'
import { CreateMessageService } from '../../useCases/message/commands/create-message/create-message.service'
import { FindMessagesByLoginController } from '../../useCases/message/queries/find-messages-by-member-login/find-messages-by-member-login.controller'
import { FindMessagesByLoginService } from '../../useCases/message/queries/find-messages-by-member-login/find-messages-by-member-login.service'
import { UpdateMessageController } from '../../useCases/message/commands/update-message/update-message.controller'
import { UpdateMessageService } from '../../useCases/message/commands/update-message/update-message.service'
import { MessageService } from '../../domain/service/message.service'

const messageModule = (container: Container) => {
  container.bind(MESSAGE_TYPES.MAPPER).to(MessageMapper)
  container.bind(MESSAGE_TYPES.QUERY_MAPPER).to(MessageQueryMapper)
  container.bind<MessageRepositoryPort>(MESSAGE_TYPES.REPOSITORY).to(MessageSequelizeRepository)
  container.bind<MessageRepositoryQueryPort>(MESSAGE_TYPES.QUERY_REPOSITORY).to(MessageSequelizeRepositoryQuery)
  container.bind(MESSAGE_TYPES.SEQUELIZE_MODEL).toConstantValue(MessageModel)

  container.bind(MessageService).toSelf()

  container.bind(CreateMessageController).toSelf()
  container.bind(CreateMessageService).toSelf()

  container.bind(UpdateMessageController).toSelf()
  container.bind(UpdateMessageService).toSelf()

  container.bind(FindMessagesByLoginController).toSelf()
  container.bind(FindMessagesByLoginService).toSelf()
}

export { messageModule }
