import { inject, injectable } from 'inversify'
import { VoteCommand } from './command'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { POST_TYPES, POST_VOTE_TYPES } from '@src/modules/forum/di/types'
import { PostRepositoryPort } from '@src/modules/forum/repository/post/repository.port'
import { PostService } from '@src/modules/forum/domain/service/post.service'
import { UserRepositoryPort } from '@src/modules/user/repository/repository.port'
import { USER_TYPES } from '@src/modules/user/di/types'
import { PostVoteRepositoryPort } from '@src/modules/forum/repository/post-vote/repository.port'
import { PostServiceBase } from '../../base.service'

type Return = number
export type VoteServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(VoteCommand)
export class PostVoteService extends PostServiceBase<VoteCommand, Return> {
  constructor(
    @inject(POST_TYPES.REPOSITORY) protected commentRepo: PostRepositoryPort,
    @inject(USER_TYPES.REPOSITORY) protected userRepo: UserRepositoryPort,
    @inject(POST_VOTE_TYPES.REPOSITORY) protected upvoteRepo: PostVoteRepositoryPort,
    protected postService: PostService
  ) {
    super(commentRepo)
  }

  async executeImpl(command: VoteCommand): Promise<Return> {
    const post = await this.commentRepo.findOneBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const user = await this.userRepo.findOneById(command.userId)
    if (!user) throw new NotFoundException()

    const vote = await this.upvoteRepo.findOneByPostIdAndUserId(post.id, command.userId)

    this.postService.addVoteToPost(post, user, vote, command.type)

    await this.commentRepo.save(post)

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
