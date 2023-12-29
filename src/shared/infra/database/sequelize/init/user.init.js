const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    field: 'first_name',
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    field: 'last_name',
    type: DataTypes.STRING,
    allowNull: true,
  },
  isEmailVerified: {
    field: 'is_email_verified',
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
