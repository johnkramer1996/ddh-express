import { inject } from 'inversify'
import { ServiceBase } from '@src/shared/core/service.base'
import { COMMENT_TYPES } from '../../di/types'
import { CommentRepositoryPort } from '../../repository/comment/repository.port'

export abstract class CommentServiceBase<T1, T2> extends ServiceBase<T1, T2> {
  constructor(@inject(COMMENT_TYPES.REPOSITORY) protected commentRepo: CommentRepositoryPort) {
    super(commentRepo)
  }
}
