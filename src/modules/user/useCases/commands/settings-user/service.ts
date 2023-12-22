import { injectable } from 'inversify'
import { SettingsUserCommand } from './command'
import { ArgumentInvalidException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { UserServiceBase } from '../../base.service'
import { loadImage } from '@src/shared/utils/load-image'
import { UserAlreadyExistsError } from '@src/modules/user/domain/user.errors'
import path from 'path'
import fs from 'fs'

type Return = void
export type UpdatePostServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(SettingsUserCommand)
export class SettingsUserService extends UserServiceBase<SettingsUserCommand, Return> {
  async executeImpl(command: SettingsUserCommand): Promise<Return> {
    const authUser = await this.userRepo.findOneById(command.authUserId)
    if (!authUser) throw new NotFoundException()

    const user = authUser

    const theSameCurrentEmail = authUser.email.value === command.email
    if (theSameCurrentEmail) throw new ArgumentInvalidException('The same email')

    const existsEmail = command.email ? await this.userRepo.findOneByEmail(command.email) : null
    if (existsEmail) throw new UserAlreadyExistsError('Email already exists')

    if (user.avatar && (command.avatar || command.deleteAvatar)) {
      const oldName = user.avatar
      const pathImage = path.resolve((global as any).__basedir, 'static', oldName)
      fs.existsSync(pathImage) && fs.unlink(pathImage, console.error)
    }

    const fileName = command.avatar ? await loadImage(command.avatar) : undefined

    user.update(authUser, { ...command, avatar: fileName })

    await this.userRepo.save(user)
  }
}
