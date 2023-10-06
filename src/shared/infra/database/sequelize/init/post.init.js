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
  type: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  text: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  link: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  slug: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  points: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  totalNumComments: {
    field: 'total_num_comments',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ...timeStamp,
}
