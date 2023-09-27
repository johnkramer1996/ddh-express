module.exports = {
  // @ts-ignore
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      text: {
        type: new Sequelize.STRING(),
        allowNull: false,
      },
      completed: {
        type: new Sequelize.BOOLEAN(),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },
  // @ts-ignore
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todos')
  },
}
