const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
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
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ...timeStamp,
}
