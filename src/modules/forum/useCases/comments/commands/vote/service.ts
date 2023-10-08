import { inject, injectable } from 'inversify'
import { CommentVoteCommand } from './command'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { COMMENT_TYPES, COMMENT_VOTE_TYPES, POST_TYPES, POST_VOTE_TYPES } from '@src/modules/forum/di/types'
import { PostRepositoryPort } from '@src/modules/forum/repository/post/repository.port'
import { PostService } from '@src/modules/forum/domain/service/post.service'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { USER_TYPES } from '@src/modules/user/di/types'
import { PostVoteRepositoryPort } from '@src/modules/forum/repository/post-vote/repository.port'
import { CommentServiceBase } from '../../base.service'
import { CommentVoteRepositoryPort } from '@src/modules/forum/repository/comment-vote/repository.port'
import { CommentRepositoryPort } from '@src/modules/forum/repository/comment/repository.port'

type Return = number
export type VoteServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(CommentVoteCommand)
export class CommentVoteService extends CommentServiceBase<CommentVoteCommand, Return> {
  constructor(
    @inject(COMMENT_TYPES.REPOSITORY) protected commentRepo: CommentRepositoryPort,
    @inject(USER_TYPES.REPOSITORY) protected userRepo: UserRepositoryPort,
    @inject(POST_TYPES.REPOSITORY) protected postRepo: PostRepositoryPort,
    @inject(COMMENT_VOTE_TYPES.REPOSITORY) protected upvoteRepo: CommentVoteRepositoryPort,
    protected postService: PostService
  ) {
    super(commentRepo)
  }

  async executeImpl(command: CommentVoteCommand): Promise<Return> {
    const post = await this.postRepo.findOneBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const comment = await this.commentRepo.findOneById(command.commentId)
    if (!comment) throw new NotFoundException()

    const user = await this.userRepo.findOneById(command.userId)
    if (!user) throw new NotFoundException()

    const vote = await this.upvoteRepo.findOneByCommentIdAndUserId(command.commentId, command.userId)

    this.postService.addVoteToComment(post, user, comment, vote, command.type)

    await this.postRepo.save(post)

    return post.points
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
