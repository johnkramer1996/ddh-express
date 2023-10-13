import { injectable } from 'inversify'
import { VoteType } from '../entity/vote.base.entity'
import { PostVoteEntity } from '../entity/post-vote/entity'
import { PostEntity } from '../entity/post/entity'
import { CommentEntity } from '../entity/comments/entity'
import { CommentVoteEntity } from '../entity/comment-vote/entity'
import { ForbiddenException } from '@src/shared/exceptions/exceptions'
import { MemberEntity } from '../entity/member/entity'

@injectable()
export class PostService {
  public createComment(post: PostEntity, member: MemberEntity, parentComment: CommentEntity | null, text: string): CommentEntity {
    const comment = CommentEntity.create({
      postId: post.id,
      memberId: member.id,
      text,
      parentId: parentComment?.id ?? null,
      points: 0,
    })

    post.addComment(comment)

    return comment
  }

  public updateComment(post: PostEntity, member: MemberEntity, comment: CommentEntity, text?: string): void {
    if (!comment.hasAccess(member)) throw new ForbiddenException()

    if (text !== undefined) comment.updateText({ text })

    post.updateComment(comment)
  }

  public removeComment(post: PostEntity, member: MemberEntity, comment: CommentEntity): void {
    if (!comment.hasAccess(member)) throw new ForbiddenException()

    post.removeComment(comment)

    comment.delete()
  }

  public addVoteToPost(post: PostEntity, member: MemberEntity, vote: PostVoteEntity | null, type: VoteType): void {
    if (!vote) {
      const vote = PostVoteEntity.create({ postId: post.id, memberId: member.id, type })
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

  public addVoteToComment(post: PostEntity, member: MemberEntity, comment: CommentEntity, vote: CommentVoteEntity | null, type: VoteType): void {
    if (!vote) {
      const vote = CommentVoteEntity.create({ commentId: comment.id, memberId: member.id, type })
      comment.addVote(vote)
      post.updateComment(comment)
      return
    }
    if (type === VoteType['upvote'] && vote.isDownvote()) {
      comment.removeVote(vote)
      post.updateComment(comment)
      return
    }
    if (type === VoteType['downvote'] && vote.isUpvote()) {
      comment.removeVote(vote)
      post.updateComment(comment)
      return
    }
  }
}
