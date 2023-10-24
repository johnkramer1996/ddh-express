import { injectable } from 'inversify'
import { CommentCreateCommand } from './command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { CommentServiceBase } from '../../base.service'
import { CommentEntity } from '@src/modules/forum/domain/entity/comments/entity'
import { NotFoundException } from '@src/shared/exceptions/exceptions'

type Return = AggregateID
export type CommentCreateServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CommentCreateCommand)
export class CommentCreateService extends CommentServiceBase<CommentCreateCommand, Return> {
  async executeImpl(command: CommentCreateCommand): Promise<Return> {
    const member = await this.memberRepo.findOneByUserId(command.userId)
    if (!member) throw new NotFoundException()

    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const parentComment = command.parentId ? await this.commentRepo.findOneById(command.parentId) : null
    if (!member) throw new NotFoundException()

    // TODO:
    // COUNT COMMENT BY MEMBER
    // BUSINESS RULE -> LESS THAN 10 COMMENTS
    // entity member add prop countPost ???
    const comment = await this.postService.createComment(post, member, parentComment, command.text)

    await this.commentRepo.save(comment)
    // await this.postRepo.save(post)
    //

    return comment.id
  }
}
