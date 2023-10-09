import { WatchedList } from '@src/shared/domain/watched-list'
import { VoteEntity } from '../entity/vote.base.entity'
import { PostVoteEntity } from '../entity/post-vote/entity'
import { CommentEntity } from '../entity/comments/entity'
import { Entity } from '@src/shared/domain/entity'
import { ObjectLiteral } from '@src/shared/types/object-literal.type'

export class Comments<T extends Entity<any>> extends WatchedList<T> {
  public compareItems(a: T, b: T): boolean {
    return a.equals(b)
  }
}

export class PostComments extends Comments<CommentEntity> {
  public static create(initialVotes: CommentEntity[] = []): PostComments {
    return new PostComments(initialVotes)
  }
}
