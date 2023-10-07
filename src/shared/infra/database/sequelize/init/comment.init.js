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
  },
  text: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  ...timeStamp,
}
