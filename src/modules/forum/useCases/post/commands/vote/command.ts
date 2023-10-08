import { ICommand } from '@src/shared/core/cqs/command.interface'
import { VoteServiceResponse } from './service'
import { VoteType } from '@src/modules/forum/domain/entity/vote.base.entity'

export class VoteCommand implements ICommand<VoteServiceResponse> {
  declare response?: VoteServiceResponse
  readonly userId: string
  readonly slug: string
  readonly type: VoteType

  constructor(props: VoteCommand) {
    this.userId = props.userId
    this.slug = props.slug
    this.type = props.type
  }
}
