import { VoteEntity } from '../vote.base.entity'
import { CommentVoteEntityCreationProps, CommentVoteEntityProps } from './comment-vote.types'

export class CommentVoteEntity extends VoteEntity<CommentVoteEntityProps> {
  static create(create: CommentVoteEntityCreationProps): CommentVoteEntity {
    const props: CommentVoteEntityProps = { ...create }
    const one = new CommentVoteEntity({ props })

    return one
  }
}
