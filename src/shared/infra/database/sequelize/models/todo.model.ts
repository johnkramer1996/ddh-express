import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { sequelize } from '../config/connection'

export type TodoAttributes = InferAttributes<TodoModel>
export type TodoCreationAttributes = InferCreationAttributes<TodoModel>

// <TodoAttributes, TodoCreationAttributes>
class TodoModel extends Model {
  declare id: CreationOptional<string>
  declare text: string
  declare completed: boolean

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
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
      type: new DataTypes.STRING(),
      allowNull: true,
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
