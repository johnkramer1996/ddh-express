import { injectable } from 'inversify'
import { CommentVoteCommand } from './command'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommentServiceBase } from '../../base.service'

type Return = number
export type VoteServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CommentVoteCommand)
export class CommentVoteService extends CommentServiceBase<CommentVoteCommand, Return> {
  async executeImpl(command: CommentVoteCommand): Promise<Return> {
    const post = await this.postRepo.findBySlugDetail(command.slug)
    if (!post) throw new NotFoundException()

    const comment = await this.commentRepo.findOneById(command.commentId)
    if (!comment) throw new NotFoundException()

    const member = await this.memberRepo.findOneById(command.userId)
    if (!member) throw new NotFoundException()

    const vote = await this.upvoteRepo.findOneByCommentIdAndUserId(command.commentId, command.userId)
    this.postService.addVoteToComment(post, member, comment, vote, command.type)

    await this.postRepo.save(post)
    return comment.points
  }
}

// function upvotePost (
//   post: PostEntity,
//   userId: string,
//   existingVotesOnPostByMember: PostVoteEntity|null
// ) {

//   const existingUpvote: PostVote = existingVotesOnPostByMember
//     .find((v) => v.isUpvote());

//   // If already upvoted, do nothing
//   const upvoteAlreadyExists = !!existingUpvote;

//   if (existingVotesOnPostByMember) {
//     return right(Result.ok<void>());
//   }

//   // If downvoted, remove the downvote
//   const existingDownvote: PostVote = existingVotesOnPostByMember
//   .find((v) => v.isDownvote());

//   const downvoteAlreadyExists = !!existingDownvote;

//   if (downvoteAlreadyExists) {
//     post.removeVote(existingDownvote);
//     return right(Result.ok<void>());
//   }

//   // Otherwise, add upvote
//   const upvoteOrError = PostVote
//     .createUpvote(member.memberId, post.postId);

//   if (upvoteOrError.isFailure) {
//     return left(upvoteOrError);
//   }

//   const upvote: PostVote = upvoteOrError.getValue();
//   post.addVote(upvote);

//   return right(Result.ok<void>());
// }
