const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  fromMemberId: {
    field: 'from_member_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: {
        tableName: 'members',
      },
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  toMemberId: {
    field: 'to_member_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: {
        tableName: 'members',
      },
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  message: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isRead: {
    field: 'is_read',
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  ...timeStamp,
}
