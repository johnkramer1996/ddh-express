const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  memberId: {
    primaryKey: true,
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
  role: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: {
        tableName: 'roles',
        // schema: 'public',
      },
      key: 'role',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  ...timeStamp,
}
