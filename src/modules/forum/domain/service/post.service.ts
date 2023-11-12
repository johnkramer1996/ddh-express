import { inject, injectable } from 'inversify'
import { VoteType } from '../entity/vote.base.entity'
import { PostVoteEntity } from '../entity/post-vote/entity'
import { PostEntity } from '../entity/post/entity'
import { CommentEntity } from '../entity/comments/entity'
import { CommentVoteEntity } from '../entity/comment-vote/entity'
import { ForbiddenException } from '@src/shared/exceptions/exceptions'
import { MemberEntity } from '../entity/member/entity'
import { POST_VOTE_TYPES } from '../../di/post/post-vote.types'
import { PostVoteRepositoryPort } from '../../repository/post-vote/repository.port'
import { CommentRepositoryPort } from '../../repository/comment/repository.port'
import { PostRepositoryPort } from '../../repository/post/repository.port'
import { POST_TYPES } from '../../di/post/post.types'
import { COMMENT_TYPES } from '../../di/comment/comment.types'

@injectable()
export class PostService {
  public async createComment(
    commentRepo: CommentRepositoryPort,
    post: PostEntity,
    member: MemberEntity,
    parentComment: CommentEntity | null,
    text: string
  ): Promise<CommentEntity> {
    // IF POST NOT ACTIVE THROW ERROR
    const countUserComment = await commentRepo.countCommentsByPostIdMemberId(post.id, member.id)
    if (countUserComment > PostEntity.maxCountCommentByUser)
      throw new ForbiddenException(`
    LIMIT COUNT COMMENT
    CURRENT = ${countUserComment}
    MAX = ${PostEntity.maxCountCommentByUser}
    `)

    return CommentEntity.create({
      postId: post.id,
      memberId: member.id,
      text,
      parentId: parentComment?.id ?? null,
      points: 0,
    })
  }

  public updateComment(post: PostEntity, member: MemberEntity, comment: CommentEntity, text?: string): void {
    if (!comment.hasAccess(member)) throw new ForbiddenException()

    if (text !== undefined) comment.updateText({ text })
  }

  public removeComment(post: PostEntity, member: MemberEntity, comment: CommentEntity): void {
    if (!comment.hasAccess(member)) throw new ForbiddenException()

    post.removeComment(comment.id)

    comment.delete()
  }

  public async addVoteToPost(postRepo: PostRepositoryPort, post: PostEntity, member: MemberEntity, type: VoteType) {
    const currentVote = await postRepo.findVoteByPostIdAndMemberId(post.id, member.id)

    if (!currentVote) {
      const vote = PostVoteEntity.create({ postId: post.id, memberId: member.id, type })
      post.addVote(vote)
      return
    }

    const isUpvote = type === VoteType.upvote
    const isDownvote = type === VoteType.downvote
    if ((isUpvote && currentVote.isDownvote()) || (isDownvote && currentVote.isUpvote())) {
      post.removeVote(currentVote)
      return
    }
  }

  public toggleVoteToComment(post: PostEntity, member: MemberEntity, comment: CommentEntity, vote: CommentVoteEntity | null, type: VoteType): void {
    // const vote = await this.voteRepo.findOneByCommentIdAndUserId(command.commentId, member.id)
    if (!vote) {
      const vote = CommentVoteEntity.create({ commentId: comment.id, memberId: member.id, type })
      comment.addVote(vote)
      // post.updateComment(comment)
      return
    }
    if (type === VoteType['upvote'] && vote.isDownvote()) {
      comment.removeVote(vote)
      // post.updateComment(comment)
      return
    }
    if (type === VoteType['downvote'] && vote.isUpvote()) {
      comment.removeVote(vote)
      // post.updateComment(comment)
      return
    }
  }
}
