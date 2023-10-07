import { injectable } from 'inversify'
import { VoteType } from '../entity/vote.base.entity'
import { PostVoteEntity } from '../entity/post-vote/entity'
import { PostEntity } from '../entity/post/entity'
import { UserEntity } from '@src/modules/user/domain/user.entity'

@injectable()
export class PostService {
  public addVoteToPost(post: PostEntity, member: UserEntity, vote: PostVoteEntity | null, type: VoteType): void {
    if (!vote) {
      const vote = PostVoteEntity.create({ postId: post.id, userId: member.id, type })
      post.addVote(vote)
      return
    }
    if (type === VoteType['upvote'] && vote.isDownvote()) {
      post.removeVote(vote)
      return
    }
    if (type === VoteType['downvote'] && vote.isUpvote()) {
      post.removeVote(vote)
      return
    }
  }

  //   public replyToComment(post: Post, member: Member, parentComment: Comment, newCommentText: CommentText): Either<Result<any>, Result<void>> {
  //     const commentOrError = Comment.create({
  //       memberId: member.memberId,
  //       text: newCommentText,
  //       postId: post.postId,
  //       parentCommentId: parentComment.commentId,
  //     })

  //     if (commentOrError.isFailure) {
  //       return left(commentOrError)
  //     }

  //     const comment: Comment = commentOrError.getValue()

  //     post.addComment(comment)

  //     return right(Result.ok<void>())
  //   }
}
