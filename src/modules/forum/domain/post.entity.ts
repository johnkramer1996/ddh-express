import { v4 } from 'uuid'
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base'
import { AggregateID } from '../../../shared/domain/entity'
import { PostCreatedDomainEvent } from './events/created.domain-event'
import { PostDeletedDomainEvent } from './events/deleted.domain-event'
import { PostEntityCreationProps, PostEntityProps } from './post.types'

export class PostEntity extends AggregateRoot<PostEntityProps> {
  protected readonly _id!: AggregateID

  static create(create: PostEntityCreationProps): PostEntity {
    const id = v4()

    const props: PostEntityProps = { ...create }
    const post = new PostEntity({ id, props })
    post.addEvent(new PostCreatedDomainEvent({ entity: post }))

    return post
  }

  public delete(): void {
    this.addEvent(new PostDeletedDomainEvent({ entity: this }))
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
