import { WatchedList } from '@src/shared/domain/watched-list'
import { VoteEntity } from '../entity/vote.base.entity'
import { PostVoteEntity } from '../entity/post-vote/entity'
import { CommentVoteEntity } from '../entity/comment-vote/entity'
import { AggregateID } from '@src/shared/domain/entity'

export class Votes<T extends VoteEntity> extends WatchedList<T> {
  public compareItems(a: T, b: T): boolean {
    return a.equals(b)
  }

  get points(): number {
    const newVotes = this.getNewItems()
    const removedVotes = this.getRemovedItems()

    if (!(newVotes.length || removedVotes.length)) return 0

    const newUpvote = newVotes.filter((v) => v.isUpvote()).length
    const newDownvote = newVotes.filter((v) => v.isDownvote()).length
    const removedUpvote = removedVotes.filter((v) => v.isUpvote()).length
    const removedDownvote = removedVotes.filter((v) => v.isDownvote()).length

    return newUpvote + removedDownvote - (newDownvote + removedUpvote)
  }
}

export class PostVotes extends Votes<PostVoteEntity> {
  public static create(initialVotes: PostVoteEntity[] = []): PostVotes {
    return new PostVotes(initialVotes)
  }
}

export class CommentVotes extends Votes<CommentVoteEntity> {
  public static create(initialVotes: CommentVoteEntity[] = []): CommentVotes {
    return new CommentVotes(initialVotes)
  }
}
