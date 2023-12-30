import { ResultWithError } from '@src/shared/core/result'
import { injectable } from 'inversify'
import { QueryHandler } from '@src/shared/core/cqs/query-handler'
import { PostServiceQueryBase } from '../../post.base.service'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { sequelize } from '@src/shared/infra/database/sequelize/config/connection'
import { PostStatus } from '@src/modules/forum/domain/entity/post/post.types'
import { CountPostsByStatusQuery } from './query'

type Return = {
  all: number
  byMember: number
  byStatus: { status: PostStatus; count: number }[]
}
export type CountByAuthUserResponse = ResultWithError<Return>

@injectable()
@QueryHandler(CountPostsByStatusQuery)
export class CountPostsByAuthUserService extends PostServiceQueryBase<CountPostsByStatusQuery, Return> {
  async executeImpl(query: CountPostsByStatusQuery): Promise<Return> {
    const authMember = await this.memberRepo.findOneByUserId(query.authUserId)
    if (!authMember) throw new NotFoundException()

    // TODO: MOVE TO REPO
    const [all] = await sequelize.query("SELECT count(*) count FROM posts WHERE NOT status = 'trash'")
    const [byStatus] = await sequelize.query(
      'SELECT posts.status, COUNT(*) count FROM posts JOIN statuses ON statuses.status=posts.status GROUP BY posts.status, statuses.order ORDER BY "order";'
    )
    const [byMember] = await sequelize.query(`SELECT count(*) count FROM posts where member_id = '${authMember.id}' AND NOT status = 'trash'`)

    return {
      all: Number((all[0] as any).count),
      byMember: Number((byMember[0] as any).count),
      byStatus: byStatus as { status: PostStatus; count: number }[],
    }
  }
}
