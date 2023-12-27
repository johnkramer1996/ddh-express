import { inject, injectable } from 'inversify'
import { SequelizeRepositoryQueryBase } from '@src/shared/infra/database/sequelize/base-query.repository'
import { ModelDefined } from 'sequelize'
import { MESSAGE_TYPES } from '../../di/message/types'
import { FindMessagesParams, MessageRepositoryQueryPort } from './repository.port'
import { MessageQuery } from '../../domain/entity/message/query'
import { MessageQueryMapper } from '../../mappers/message/mapper-query'
import { Paginated } from '@src/shared/domain/repository.port'
import { Op } from 'sequelize'

@injectable()
export class MessageSequelizeRepositoryQuery extends SequelizeRepositoryQueryBase<MessageQuery> implements MessageRepositoryQueryPort {
  constructor(@inject(MESSAGE_TYPES.QUERY_MAPPER) mapper: MessageQueryMapper, @inject(MESSAGE_TYPES.SEQUELIZE_MODEL) model: ModelDefined<any, any>) {
    super(mapper, model)
  }

  public async findAllPaginatedByFromMemberAndToMember(query: FindMessagesParams, fromMemberId: string, toMemberId: string): Promise<Paginated<MessageQuery>> {
    return await super.findAllPaginated(query, {
      where: {
        [Op.and]: {
          fromMemberId: { [Op.or]: [fromMemberId, toMemberId] },
          toMemberId: { [Op.or]: [fromMemberId, toMemberId] },
        },
      },
    })
  }
}
