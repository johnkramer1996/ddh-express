'use strict'

const uuid = require('uuid')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const testId = `11111111-1111-1111-1111-111111111111`
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: testId,
          email: `vitalii@gmail.com`,
          login: 'vitalii',
          password: bcrypt.hashSync('12345678', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        ...Array(9)
          .fill(null)
          .map((_, i) => ({
            id: '11111111-1111-1111-1111-11111111112' + i,
            email: `user${i}@gmail.com`,
            login: `login-${i}`,
            password: bcrypt.hashSync('12345678', 8),
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

    await queryInterface.bulkInsert('members', [
      {
        id: testId,
        user_id: users[0].id,
        reputation: 0,
        is_banned: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    await queryInterface.bulkInsert(
      'members',
      users.slice(1).map((i, index) => ({
        id: uuid.v4(),
        user_id: i.id,
        reputation: 0,
        is_banned: false,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    )

    await queryInterface.bulkInsert(
      'posts',
      [
        {
          id: testId,
          member_id: testId,
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
            member_id: testId,
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
          id: testId,
          member_id: testId,
          post_id: testId,
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
          id: testId,
          member_id: testId,
          post_id: testId,
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
            member_id: testId,
            post_id: testId,
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
          id: testId,
          member_id: testId,
          comment_id: testId,
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
    await queryInterface.bulkDelete('post_votes', null, {})
    await queryInterface.bulkDelete('posts', null, {})
    await queryInterface.bulkDelete('comment_votes', null, {})
    await queryInterface.bulkDelete('comments', null, {})
    await queryInterface.bulkDelete('user_addresses', null, {})
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('members', null, {})
  },
}
