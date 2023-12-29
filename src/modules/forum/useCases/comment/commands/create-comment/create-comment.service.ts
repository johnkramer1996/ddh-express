import { injectable } from 'inversify'
import { CreateCommentCommand } from './create-comment.command'
import { AggregateID } from '@src/shared/domain/entity'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { CommentServiceBase } from '../../comment.base.service'
import { ArgumentInvalidException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { MemberIsBannedError } from '@src/modules/forum/domain/entity/member/member.errors'

type Return = AggregateID
export type CreateCommentServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CreateCommentCommand)
export class CreateCommentService extends CommentServiceBase<CreateCommentCommand, Return> {
  async executeImpl(command: CreateCommentCommand): Promise<Return> {
    const member = await this.memberRepo.findOneByUserId(command.userId)
    if (!member) throw new NotFoundException()

    if (member.isBanned) throw new MemberIsBannedError()

    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const parentComment = command.parentId ? await this.commentRepo.findOneById(command.parentId) : null
    if (command.parentId && !parentComment) throw new NotFoundException()

    if (parentComment && !(parentComment.postId === post.id)) throw new ArgumentInvalidException('!(parentComment.postId===post.id)')

    const comment = await this.postService.createComment(this.commentRepo, post, member, parentComment, command.text)

    await this.commentRepo.save(comment)
    await this.postRepo.save(post)

    return comment.id
  }
}
