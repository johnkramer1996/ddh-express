import { injectable } from 'inversify'
import { VoteType } from '../entity/vote.base.entity'
import { PostVoteEntity } from '../entity/post-vote/entity'
import { PostEntity } from '../entity/post/entity'
import { CommentEntity } from '../entity/comments/entity'
import { CommentVoteEntity } from '../entity/comment-vote/entity'
import { ForbiddenException } from '@src/shared/exceptions/exceptions'
import { MemberEntity } from '../entity/member/entity'
import { CommentRepositoryPort } from '../../repository/comment/repository.port'
import { PostVoteRepositoryPort } from '../../repository/post-vote/repository.port'
import { CommentVoteRepositoryPort } from '../../repository/comment-vote/repository.port'
import { UpdatePostProps } from '../entity/post/types'

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
      throw new ForbiddenException(`LIMIT COUNT COMMENT CURRENT = ${countUserComment} MAX = ${PostEntity.maxCountCommentByUser}`)

    post.addComment()

    return CommentEntity.create({
      postId: post.id,
      memberId: member.id,
      text,
      parentId: parentComment?.id ?? null,
      points: 0,
    })
  }

  public updatePost(post: PostEntity, member: MemberEntity, update: UpdatePostProps): void {
    if (!post.hasAccess(member)) throw new ForbiddenException()

    post.update(update)
  }

  public updateComment(post: PostEntity, member: MemberEntity, comment: CommentEntity, text?: string): void {
    if (!comment.hasAccess(member)) throw new ForbiddenException()

    if (text !== undefined) comment.updateText({ text })
  }

  public removeComment(post: PostEntity, member: MemberEntity, comment: CommentEntity): void {
    if (!comment.hasAccess(member)) throw new ForbiddenException()

    post.removeComment()

    comment.delete()
  }

  public async addVoteToPost(postVoteRepo: PostVoteRepositoryPort, post: PostEntity, member: MemberEntity, type: VoteType) {
    const currentVote = await postVoteRepo.findOneByPostIdAndMemberId(post.id, member.id)

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

  public async addVoteToComment(commentVoteRepo: CommentVoteRepositoryPort, comment: CommentEntity, member: MemberEntity, type: VoteType) {
    const currentVote = await commentVoteRepo.findOneByCommentIdAndMemberId(comment.id, member.id)

    if (!currentVote) {
      const vote = CommentVoteEntity.create({ commentId: comment.id, memberId: member.id, type })
      comment.addVote(vote)
      return
    }

    const isUpvote = type === VoteType.upvote
    const isDownvote = type === VoteType.downvote
    if ((isUpvote && currentVote.isDownvote()) || (isDownvote && currentVote.isUpvote())) {
      comment.removeVote(currentVote)
      return
    }
  }
}
