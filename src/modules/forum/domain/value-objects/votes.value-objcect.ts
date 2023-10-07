import { WatchedList } from '@src/shared/domain/watched-list'
import { VoteEntity } from '../entity/vote.base.entity'
import { PostVoteEntity } from '../entity/post-vote/entity'

export class Votes<T extends VoteEntity> extends WatchedList<T> {
  constructor(initialVotes?: T[]) {
    super(initialVotes)
  }

  public compareItems(a: T, b: T): boolean {
    return a.equals(b)
  }

  get points(): number {
    if (!(this.getNewItems().length || this.getRemovedItems().length)) return 0

    const newVotes = this.getNewItems()
    const removedVotes = this.getRemovedItems()

    const newUpvote = newVotes.filter((v) => v.isUpvote()).length
    const newDownvote = newVotes.filter((v) => v.isDownvote()).length
    const removedUpvote = removedVotes.filter((v) => v.isUpvote()).length
    const removedDownvote = removedVotes.filter((v) => v.isDownvote()).length
    console.log({ newUpvote, newDownvote, removedUpvote, removedDownvote })

    return newUpvote - newDownvote - removedUpvote + removedDownvote
  }
}

export class PostVotes extends Votes<PostVoteEntity> {
  public static create(initialVotes: PostVoteEntity[] = []): PostVotes {
    return new PostVotes(initialVotes)
  }
}
