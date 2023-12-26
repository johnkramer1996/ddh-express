const { DataTypes } = require('sequelize')
const timeStamp = require('./time-stamp.init.js')

module.exports = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
  },
  memberId: {
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
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: {
        tableName: 'statuses',
        // schema: 'public',
      },
      key: 'status',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
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
