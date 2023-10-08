import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CommentUpdateRequestDto } from './request.dto'
import { CommentUpdateCommand } from './command'
import { TodoIdRequestDto } from '@src/modules/todo/dtos/todo-id.request.dto'
import { ControllerPost } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { CommentControllerBase } from '../../base.controller'

@injectable()
@ControllerPost(routes.postComments.updateOne)
export class CommentUpdateController extends CommentControllerBase {
  @ValidateRequest([
    ['body', CommentUpdateRequestDto],
    ['params', TodoIdRequestDto],
  ])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const body = plainToClass(CommentUpdateRequestDto, req.body)
    const params = plainToClass(TodoIdRequestDto, req.params)

    const command = new CommentUpdateCommand({ ...body, ...params })
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
