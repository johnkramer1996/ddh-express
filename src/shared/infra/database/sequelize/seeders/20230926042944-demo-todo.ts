'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // @ts-ignore
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'todos',
      Array(30)
        .fill(null)
        .map((_, i) => ({
          id: uuid.v4(),
          text: `Todo ${i}`,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      {}
    )
  },

  // @ts-ignore
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {})
  },
}
