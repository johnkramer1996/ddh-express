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
        // schema: 'public',
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
        // schema: 'public',
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
