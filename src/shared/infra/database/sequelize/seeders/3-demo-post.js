'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'posts',
      Array(10)
        .fill(null)
        .map((_, i) => ({
          id: uuid.v4(),
          text: `Post ` + i,
          user_id: '11111111-1111-1111-1111-111111111111',
          created_at: new Date(),
          updated_at: new Date(),
        })),
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {})
  },
}
