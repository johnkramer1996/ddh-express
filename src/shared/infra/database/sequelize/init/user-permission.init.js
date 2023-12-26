const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  // id: {
  //   primaryKey: true,
  //   allowNull: false,
  //   type: DataTypes.UUID,
  // },
  userId: {
    primaryKey: true,
    field: 'user_id',
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: {
        tableName: 'users',
        // schema: 'public',
      },
      key: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  permission: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: {
        tableName: 'permissions',
        // schema: 'public',
      },
      key: 'permission',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  ...timeStamp,
}
