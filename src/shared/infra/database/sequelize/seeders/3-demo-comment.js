'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          id: '11111111-1111-1111-1111-111111111111',
          user_id: '11111111-1111-1111-1111-111111111111',
          post_id: '11111111-1111-1111-1111-111111111111',
          text: `Text comment test`,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },
        ...Array(10)
          .fill(null)
          .map((_, i) => ({
            id: uuid.v4(),
            user_id: '11111111-1111-1111-1111-111111111111',
            post_id: '11111111-1111-1111-1111-111111111111',
            text: `Text comment` + i,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          })),
      ],
      {}
    )

    await queryInterface.bulkInsert(
      'comment_votes',
      [
        {
          id: '11111111-1111-1111-1111-111111111111',
          user_id: '11111111-1111-1111-1111-111111111111',
          comment_id: '11111111-1111-1111-1111-111111111111',
          type: `upvote`,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comment_votes', null, {})
    await queryInterface.bulkDelete('comments', null, {})
  },
}
