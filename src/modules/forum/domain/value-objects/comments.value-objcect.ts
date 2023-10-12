import { WatchedList } from '@src/shared/domain/watched-list'
import { CommentEntity } from '../entity/comments/entity'
import { Entity } from '@src/shared/domain/entity'

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
