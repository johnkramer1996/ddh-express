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
          user_id: '11111111-1111-1111-1111-111111111111',
          type: `text`,
          title: `Title post ` + i,
          text: `Text post` + i,
          link: null,
          slug: 'slug' + i,
          points: i,
          total_num_comments: i,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        })),
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {})
  },
}
