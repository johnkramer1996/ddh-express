const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isEmailVerified: {
    field: 'is_email_verified',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isAdminUser: {
    field: 'is_admin_user',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isDeleted: {
    field: 'is_deleted',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  lastLogin: {
    field: 'last_login',
    type: DataTypes.DATE,
    allowNull: true,
  },
  ...timeStamp,
}
