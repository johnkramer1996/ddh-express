const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  status: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  ...timeStamp,
}
