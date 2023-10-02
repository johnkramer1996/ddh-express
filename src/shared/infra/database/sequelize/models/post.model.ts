import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection'
import { injectable } from 'inversify'
import { AddressModel } from './address.model'

export interface PostAttributes extends PostCreationAttributes {
  // title: string
  // text: string
  // link: string
  // slug: string
  // points: number
  // total_num_comments: number
  createdAt: Date
  updatedAt: Date
}

export interface PostCreationAttributes {
  id: string
  type: string
}

@injectable()
class PostModel extends Model<PostAttributes, PostCreationAttributes> {
  declare id: string
  declare type: string

  declare createdAt: Date
  declare updatedAt: Date
}

PostModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'posts',
    sequelize,
  }
)

//has many vote

export default PostModel
