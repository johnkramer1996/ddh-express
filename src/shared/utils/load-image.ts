import { ArgumentInvalidException, NotFoundException } from '@src/shared/exceptions/exceptions'
import { v4 } from 'uuid'
import path from 'path'
import fileUpload from 'express-fileupload'

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

export const loadImage = async (image: fileUpload.UploadedFile | fileUpload.UploadedFile[]) => {
  if (Array.isArray(image)) throw new ArgumentInvalidException('image must be single')
  if (!whitelist.includes(image.mimetype)) throw new ArgumentInvalidException('image must be correctly type')
  const fileName = v4() + '_' + image.name
  const pathImage = path.resolve((global as any).__basedir, 'static', fileName)
  await image.mv(pathImage)
  return fileName
}
