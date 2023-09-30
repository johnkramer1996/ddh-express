module.exports = {
  // @ts-ignore
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_addresses', {
      user_id: {
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'users',
            schema: 'public',
          },
          key: 'id',
        },
        allowNull: false,
      },
      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      street: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    })
  },
  // @ts-ignore
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_addresses')
  },
}
