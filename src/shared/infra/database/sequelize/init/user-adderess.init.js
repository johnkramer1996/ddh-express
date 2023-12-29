const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    field: 'user_id',
    primaryKey: true,
    type: DataTypes.UUID,
    onDelete: 'CASCADE',
    references: {
      model: {
        tableName: 'users',
        // schema: 'public',
      },
      key: 'id',
    },
    allowNull: false,
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    field: 'postal_code',
    type: DataTypes.STRING,
    allowNull: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ...timeStamp,
}
