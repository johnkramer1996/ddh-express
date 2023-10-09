const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
  },
  parentId: {
    field: 'parent_id',
    allowNull: true,
    type: DataTypes.UUID,
    references: {
      model: {
        tableName: 'comments',
        schema: 'public',
      },
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: {
        tableName: 'users',
        schema: 'public',
      },
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  postId: {
    field: 'post_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: {
        tableName: 'posts',
        schema: 'public',
      },
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  text: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  points: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ...timeStamp,
}
