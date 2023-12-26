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
import { PostEntityCreationProps, PostType, UpdatePostProps } from '../entity/post/types'
import { PostRepositoryPort } from '../../repository/post/repository.port'
import { Slug } from '../value-objects/slug.value-object'

@injectable()
export class PostService {
  public async createPost(postRepo: PostRepositoryPort, member: MemberEntity, create: Omit<PostEntityCreationProps, 'memberId' | 'slug'>): Promise<PostEntity> {
    const countUserComment = await postRepo.countByPostIdMemberId(member.id)
    if (countUserComment > PostEntity.maxCountPostByUser)
      throw new ForbiddenException(`Limit count post by user. Current = ${countUserComment} / Maximum = ${PostEntity.maxCountPostByUser}`)

    return PostEntity.create({
      memberId: member.id,
      type: create.type,
      image: create.image,
      title: create.title,
      text: create.type === PostType.text ? create.text : null,
      link: create.type === PostType.text ? null : create.link,
      slug: Slug.create({ value: create.title }),
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

  public async createComment(
    commentRepo: CommentRepositoryPort,
    post: PostEntity,
    member: MemberEntity,
    parentComment: CommentEntity | null,
    text: string
  ): Promise<CommentEntity> {
    if (post.status !== 'approved') throw new Error('Unable to add a comment to a message that has not been approved')

    const countUserComment = await commentRepo.countByPostIdMemberId(post.id, member.id)
    if (countUserComment > PostEntity.maxCountCommentByUser)
      throw new ForbiddenException(`Limit count comment by user. Current = ${countUserComment} / Maximum = ${PostEntity.maxCountPostByUser}`)

    post.addComment()

    return CommentEntity.create({
      postId: post.id,
      memberId: member.id,
      text,
      parentId: parentComment?.id ?? null,
      points: 0,
    })
  }

  public removeComment(post: PostEntity, member: MemberEntity, comment: CommentEntity): void {
    if (!comment.hasAccess(member)) throw new ForbiddenException()

    post.removeComment()

    comment.delete()
  }

  public async addVoteToPost(postVoteRepo: PostVoteRepositoryPort, post: PostEntity, member: MemberEntity, type: VoteType) {
    if (post.status !== 'approved') throw new Error('A post that has not been approved cannot be voted on')

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
