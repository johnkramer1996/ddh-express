import { inject, injectable } from 'inversify'
import { SequelizeRepositoryBase } from '../../../../shared/infra/database/sequelize/base.repository'
import { ModelDefined } from 'sequelize'
import { MessageMapper } from '../../mappers/message/mapper-domain'
import { MESSAGE_TYPES } from '../../di/message/types'
import { MessageModelAttributes } from '../../domain/entity/message/types'
import { MessageEntity } from '../../domain/entity/message/entity'
import { MessageRepositoryPort } from './repository.port'

@injectable()
export class MessageSequelizeRepository extends SequelizeRepositoryBase<MessageEntity, MessageModelAttributes> implements MessageRepositoryPort {
  constructor(@inject(MESSAGE_TYPES.MAPPER) mapper: MessageMapper, @inject(MESSAGE_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }
}
