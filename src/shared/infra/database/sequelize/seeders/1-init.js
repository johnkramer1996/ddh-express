'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: '11111111-1111-1111-1111-111111111111',
          email: `vitalii@gmail.com`,
          password: '12345',
          created_at: new Date(),
          updated_at: new Date(),
        },
        ...Array(9)
          .fill(null)
          .map((_, i) => ({
            id: '11111111-1111-1111-1111-11111111112' + i,
            email: `user${i}@gmail.com`,
            password: '12345',
            created_at: new Date(),
            updated_at: new Date(),
          })),
      ],
      {}
    )

    const [users] = await queryInterface.sequelize.query(`SELECT id from users;`)

    await queryInterface.bulkInsert(
      'user_addresses',
      users.map((i, index) => ({
        id: uuid.v4(),
        user_id: i.id,
        country: 'country ' + index,
        street: 'street ' + index,
        postalCode: 'postal code ' + index,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    )

    await queryInterface.bulkInsert(
      'posts',
      [
        {
          id: '11111111-1111-1111-1111-111111111111',
          user_id: '11111111-1111-1111-1111-111111111111',
          type: `text`,
          title: `Title post  test`,
          text: `Text post test`,
          link: null,
          slug: 'slug-test',
          points: 100,
          total_num_comments: 0,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },

        ...Array(10)
          .fill(null)
          .map((_, i) => ({
            id: uuid.v4(),
            user_id: '11111111-1111-1111-1111-111111111111',
            type: `text`,
            title: `Title post ` + i,
            text: `Text post` + i,
            link: null,
            slug: 'slug' + i,
            points: 0,
            total_num_comments: 0,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
          })),
      ],
      {}
    )

    await queryInterface.bulkInsert(
      'post_votes',
      [
        {
          id: '11111111-1111-1111-1111-111111111111',
          user_id: '11111111-1111-1111-1111-111111111111',
          post_id: '11111111-1111-1111-1111-111111111111',
          type: `upvote`,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },
      ],
      {}
    )

    await queryInterface.bulkInsert(
      'comments',
      [
        {
          id: '11111111-1111-1111-1111-111111111111',
          user_id: '11111111-1111-1111-1111-111111111111',
          post_id: '11111111-1111-1111-1111-111111111111',
          text: `Text comment test`,
          points: 0,
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
            points: 0,
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
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('user_addresses', null, {})
    await queryInterface.bulkDelete('post_votes', null, {})
    await queryInterface.bulkDelete('posts', null, {})
    await queryInterface.bulkDelete('comment_votes', null, {})
    await queryInterface.bulkDelete('comments', null, {})
  },
}
