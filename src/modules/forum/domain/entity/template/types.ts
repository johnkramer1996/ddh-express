import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'

export interface TemplateEntityCreationProps {}

export interface TemplateEntityProps extends TemplateEntityCreationProps {
  reputation: number
}

export interface TemplateModelCreationAttributes extends PrimaryKey {
  reputation: number
}

export interface TemaplteModelAttributes extends TemplateModelCreationAttributes, TimeStamp {}
