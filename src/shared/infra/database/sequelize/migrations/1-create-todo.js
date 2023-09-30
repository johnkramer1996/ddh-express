module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      text: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todos')
  },
}
