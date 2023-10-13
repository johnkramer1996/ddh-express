const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
  },
  memberId: {
    field: 'member_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: {
        tableName: 'members',
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
