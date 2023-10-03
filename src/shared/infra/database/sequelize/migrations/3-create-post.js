module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize
    return queryInterface.createTable('posts', {
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
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: DataTypes.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts')
  },
}
