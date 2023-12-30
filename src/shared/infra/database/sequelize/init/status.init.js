const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  order: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  ...timeStamp,
}
