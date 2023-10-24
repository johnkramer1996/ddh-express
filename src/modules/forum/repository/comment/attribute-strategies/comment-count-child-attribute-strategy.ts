import { AttributeStrategyPort, Attribute } from '@src/shared/domain/repository.port'

export class CommentCountChildAttributeStrategy implements AttributeStrategyPort {
  constructor() {}

  public apply(): Attribute {
    return [
      `(
      WITH RECURSIVE r AS (
        SELECT id FROM comments d 
        WHERE comments.id = d.parent_id
        UNION ALL
        SELECT comments.id FROM comments 
        JOIN r ON comments.parent_id = r.id
      )
      SELECT COUNT(*) FROM r
    )`,
      'childCount',
    ]
  }
}
