import { injectable } from 'inversify'
import { VoteEntity, VoteType } from '../vote.entity'
import { PostVoteEntity } from '../post-vote.envity'
import { PostEntity } from '../post.entity'
import { UserEntity } from '@src/modules/user/domain/user.entity'

@injectable()
export class PostService {
  public addVote(post: PostEntity, member: UserEntity, vote: VoteEntity | null, type: VoteType): void {
    if (!vote) {
      const vote = PostVoteEntity.create({ postId: post.id, userId: member.id, type })
      post.addVote(vote, member)
      return
    }
    // console.log(type === VoteType['upvote'], voteOnPostByMember.isDownvote())
    // console.log(type === VoteType['downvote'], voteOnPostByMember.isUpvote())
    if (type === VoteType['upvote'] && vote.isDownvote()) {
      post.removeVote(vote, member)
      return
    }
    if (type === VoteType['downvote'] && vote.isUpvote()) {
      post.removeVote(vote, member)
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
