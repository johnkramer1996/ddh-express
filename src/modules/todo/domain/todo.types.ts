import { Text } from './value-objects/text.value-object'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'

export interface TodoEntityCreationProps {
  text: Text
  completed: boolean
}

export interface TodoEntityProps extends TodoEntityCreationProps {}

export interface TodoModelCreationAttributes extends PrimaryKey {
  text: string
  completed: boolean
}

export interface TodoModelAttributes extends TodoModelCreationAttributes, TimeStamp {}
