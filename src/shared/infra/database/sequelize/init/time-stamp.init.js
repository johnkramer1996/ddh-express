const { DataTypes } = require('sequelize')

module.exports = {
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: 'updated_at',
    allowNull: true,
    type: DataTypes.DATE,
  },
  deletedAt: {
    field: 'deleted_at',
    allowNull: true,
    type: DataTypes.DATE,
  },
}
