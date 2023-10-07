import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'

export interface TemplateEntityCreationProps {
  text: string
  postId: string
  userId: string
}

export interface TemplateEntityProps extends TemplateEntityCreationProps {}

export interface TemplateModelCreationAttributes extends PrimaryKey {
  text: string
  postId: string
  userId: string
}

export interface TemaplteModelAttributes extends TemplateModelCreationAttributes, TimeStamp {}
