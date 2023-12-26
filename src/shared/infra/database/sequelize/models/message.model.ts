import { sequelize } from '../config/connection'
import { BaseModel } from './base.model'
import messageInit from '../init/message.init'
import { MessageModelAttributes, MessageModelCreationAttributes } from '@src/modules/forum/domain/entity/message/types'

export class MessageModel extends BaseModel<MessageModelAttributes, MessageModelCreationAttributes> {}

MessageModel.init(messageInit, { tableName: 'messages', sequelize })

MessageModel.addScope(
  'defaultScope',
  {
    order: [['createdAt', 'DESC']],
  },
  { override: true }
)
