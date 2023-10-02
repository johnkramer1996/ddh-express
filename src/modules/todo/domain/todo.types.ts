import { Text } from './value-objects/text.value-object'
import { TimeStamp } from '@src/shared/core/time-stamp'
import { PrimaryKey } from '@src/shared/core/primary-key'

export interface TodoCreationProps {
  text: Text
  completed: boolean
}

export interface TodoProps extends TodoCreationProps {}

export interface TodoModelCreationAttributes extends PrimaryKey {
  text: string
  completed: boolean
}

export interface TodoModelAttributes extends TodoModelCreationAttributes, TimeStamp {}

export interface TodoUpdateTextProps {
  text: Text
}
