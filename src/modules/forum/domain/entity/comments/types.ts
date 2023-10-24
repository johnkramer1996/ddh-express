import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'
import { CommentVoteModelAttributes } from '../comment-vote/types'
import { CommentVotes } from '../../value-objects/votes.value-objcect'
import { MemberModelWithAdditonAttributes } from '../member/types'

// TODO:
// POST ID -> VALUE OBJECT
export interface CommentEntityCreationProps {
  parentId: string | null
  postId: string
  memberId: string
  text: string
  points: number
}

export interface CommentEntityProps extends CommentEntityCreationProps {
  // TODO:
  // https://stackoverflow.com/questions/37662541/ddd-do-i-really-need-to-load-all-objects-in-an-aggregate-performance-concerns
  // Typically, you'll come to realize that changing an order doesn't (or shouldn't) depend on the state of other orders in the system,
  // which is a good indication that two different orders should not be part of the same aggregate.
  // OR
  // Here it is pretty clear that the state of a Bid depends on the state of an Auction.

  votes: CommentVotes
  // TODO:
  //https://www.alibabacloud.com/blog/an-in-depth-understanding-of-aggregation-in-domain-driven-design_598034
  // However, products and users cannot be part of this aggregation

  // TODO:
  // move to query model
  // childCount?: number
  // children?: CommentEntity[]
}

export interface CommentModelCreationAttributes extends PrimaryKey {
  parentId: string | null
  postId: string
  memberId: string
  text: string
  points: number
}

// TODO:
// https://khalilstemmler.com/articles/typescript-domain-driven-design/aggregate-design-persistence/
// just retrieve the data you need, directly from the repository/repositories to create the DTO.
// So in the context of DTOs, adding additional info to our aggregate for the sake of having them available for our DTOs has potential to hurt performance, don't do it.
export interface CommentModelAttributes extends CommentModelCreationAttributes, TimeStamp {}

// TODO:
// https://stackoverflow.com/questions/37662541/ddd-do-i-really-need-to-load-all-objects-in-an-aggregate-performance-concerns
// we can just keep the relation between both entities thru an identifier reference
// class OrderWasCreatedListener:
//     var customer = customerRepository.findOfId(event.customerId);
//     var order = orderRepository.findOfId(event.orderId);
//     customer.placeOrder(order); //Check business rules
//     customerRepository.save(customer);
export interface CommentModelAdditionalAttribute extends CommentModelAttributes {
  countChild: number
  member: MemberModelWithAdditonAttributes
  votes: CommentVoteModelAttributes[]
  children?: CommentModelAttributes[]
}
