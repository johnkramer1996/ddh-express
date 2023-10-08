import { injectable } from 'inversify'
import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { ValidateRequest } from '@src/shared/infra/http/decorators/validate-request'
import { CommentDeleteOneCommand } from './command'
import { ControllerDelete } from '@src/shared/infra/http/decorators/controller'
import { routes } from '@src/configs/routes'
import { UserController } from '@src/modules/user/useCases/base.controller'
import { CommentIdRequestDto } from '@src/modules/forum/dtos/comment/id.request.dto'

@injectable()
@ControllerDelete(routes.postComments.deleteOne)
export class CommentDeleteOneController extends UserController {
  @ValidateRequest([['params', CommentIdRequestDto]])
  async executeImpl(req: Request, res: Response): Promise<any> {
    const params = plainToClass(CommentIdRequestDto, req.params)

    const command = new CommentDeleteOneCommand(params)
    const result = await this.commandBus.execute(command)

    if (!result.isSuccess) return this.handleError(res, result.getValue())

    return this.ok(res)
  }
}
