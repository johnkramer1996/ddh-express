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
  commentId: {
    field: 'comment_id',
    allowNull: false,
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
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ...timeStamp,
}
