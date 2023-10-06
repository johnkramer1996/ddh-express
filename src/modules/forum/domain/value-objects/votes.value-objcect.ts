import { WatchedList } from '@src/shared/domain/watched-list'
import { VoteEntity } from '../vote.entity'

export class Votes extends WatchedList<VoteEntity> {
  constructor(initialVotes?: VoteEntity[]) {
    super(initialVotes)
  }

  public static create(initialVotes?: VoteEntity[]): Votes {
    return new Votes(initialVotes ? initialVotes : [])
  }

  public compareItems(a: VoteEntity, b: VoteEntity): boolean {
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
