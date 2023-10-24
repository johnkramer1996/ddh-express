import { AttributeStrategyPort, Attribute } from '@src/shared/domain/repository.port'

export class CommentCountLikesAttributeStrategy implements AttributeStrategyPort {
  constructor() {}

  public apply(): Attribute {
    return [
      `(
      SELECT COUNT(*) FROM comment_votes 
      WHERE comments.id = comment_votes.comment_id
      )`,
      'likeCount',
    ]
  }
}
