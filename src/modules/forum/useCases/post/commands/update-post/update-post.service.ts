import path from 'path'
import fs from 'fs'
import { injectable } from 'inversify'
import { UpdatePostCommand } from './update-post.command'
import { NotFoundException } from '@src/shared/exceptions/exceptions'
import { CommandHandler } from '@src/shared/core/cqs/command-handler'
import { ResultWithError } from '@src/shared/core/result'
import { PostServiceBase } from '../../base.service'
import { loadImage } from '@src/shared/utils/load-image'

type Return = void
export type UpdatePostServiceResponse = ResultWithError<Return>

@injectable()
@CommandHandler(UpdatePostCommand)
export class UpdatePostService extends PostServiceBase<UpdatePostCommand, Return> {
  async executeImpl(command: UpdatePostCommand): Promise<Return> {
    const post = await this.postRepo.findBySlug(command.slug)
    if (!post) throw new NotFoundException()

    const member = await this.memberRepo.findOneByUserId(command.authUserId)
    if (!member) throw new NotFoundException()

    const newFileName = command.image ? await loadImage(command.image) : undefined
    const oldImagePath = command.image ? path.resolve((global as any).__basedir, 'static', post.image) : null

    this.postService.updatePost(post, member, { ...command, image: newFileName })

    try {
      await this.postRepo.save(post)
      oldImagePath && fs.existsSync(oldImagePath) && fs.unlink(oldImagePath, console.error)
    } catch (e) {
      if (newFileName) {
        const pathNewImage = path.resolve((global as any).__basedir, 'static', newFileName)
        fs.unlink(pathNewImage, console.error)
      }
    }
  }
}
