import path from 'path'
import fs from 'fs'
import { injectable } from 'inversify'
import { UpdateUserCommand } from './update-user.command'
import { ArgumentInvalidException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { UserServiceBase } from '../../user.base.service'
import { loadImage } from '@src/shared/utils/load-image'
import { UserAlreadyExistsError } from '@src/modules/user/domain/user.errors'

type Return = void
export type UpdatePostServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserService extends UserServiceBase<UpdateUserCommand, Return> {
  async executeImpl(command: UpdateUserCommand): Promise<Return> {
    const authUser = await this.userRepo.findOneById(command.authUserId)
    if (!authUser) throw new NotFoundException()

    const user = authUser

    const theSameCurrentEmail = authUser.email.value === command.email
    if (theSameCurrentEmail) throw new ArgumentInvalidException('The same email')

    const existsEmail = command.email ? await this.userRepo.findOneByEmail(command.email) : null
    if (existsEmail) throw new UserAlreadyExistsError('Email already exists')

    const hasAvatar = user.avatar
    const deleteAvatar = command.avatar || command.deleteAvatar
    const needDeleteOldAvatar = hasAvatar && deleteAvatar
    const oldAvatarPath = needDeleteOldAvatar ? path.resolve((global as any).__basedir, 'static', user.avatar) : null
    const newFileName = command.avatar ? await loadImage(command.avatar) : undefined

    user.update(authUser, { ...command, avatar: newFileName })

    try {
      await this.userRepo.save(user)
      oldAvatarPath && fs.existsSync(oldAvatarPath) && fs.unlink(oldAvatarPath, console.error)
    } catch (e) {
      if (newFileName) {
        const pathNewImage = path.resolve((global as any).__basedir, 'static', newFileName)
        fs.unlink(pathNewImage, console.error)
      }
    }
  }
}
