import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { TodoModelAttributes, TodoModelCreationAttributes } from '@src/modules/todo/domain/todo.types'

@injectable()
class TodoModel extends Model<TodoModelAttributes, TodoModelCreationAttributes> {
  declare id: string
  declare text: string
  declare completed: boolean

  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date | null
}

TodoModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    completed: {
      type: new DataTypes.BOOLEAN(),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'todos',
    sequelize,
  }
)

export default TodoModel
