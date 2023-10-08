import { VoteEntity } from '../vote.base.entity'
import { CommentVoteEntityCreationProps, CommentVoteEntityProps } from './types'

export class CommentVoteEntity extends VoteEntity<CommentVoteEntityProps> {
  static create(create: CommentVoteEntityCreationProps): CommentVoteEntity {
    const props: CommentVoteEntityProps = { ...create }
    const one = new CommentVoteEntity({ props })

    return one
  }
}
