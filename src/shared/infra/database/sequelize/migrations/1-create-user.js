module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userInit = await import('../init/user.init.js')
    const userAddress = await import('../init/user-adderess.init.js')

    await queryInterface.createTable('users', userInit.default)
    await queryInterface.createTable('user_addresses', userAddress.default)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_addresses')
    await queryInterface.dropTable('users')
  },
}
