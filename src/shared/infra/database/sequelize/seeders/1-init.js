'use strict'

const uuid = require('uuid')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const testId1 = `11111111-1111-1111-1111-111111111111`
    const testId2 = `11111111-1111-1111-1111-111111111120`
    const testId3 = `11111111-1111-1111-1111-111111111121`
    await queryInterface.bulkInsert('permissions', [
      {
        permission: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        permission: 'member',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: testId1,
          avatar: null,
          login: 'vitalii',
          email: `vitalii@gmail.com`,
          password: bcrypt.hashSync('12345678', 8),
          first_name: `Vitalii`,
          last_name: `Zinoviev`,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: testId2,
          avatar: null,
          login: 'victor',
          email: `victor@gmail.com`,
          password: bcrypt.hashSync('12345678', 8),
          first_name: `Victor`,
          last_name: `Zagorodnii`,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: testId3,
          avatar: null,
          login: 'nina',
          email: `nina@gmail.com`,
          password: bcrypt.hashSync('12345678', 8),
          first_name: `Nina`,
          last_name: `Zagorodniya`,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )

    const [permissions] = await queryInterface.sequelize.query(`SELECT permission from permissions;`)
    const [users] = await queryInterface.sequelize.query(`SELECT id from users;`)

    await queryInterface.bulkInsert('user_permissions', [
      {
        user_id: users[0].id,
        permission: permissions[0].permission, // admin
        created_at: new Date(),
        updated_at: new Date(),
      },
      ...users.map((user) => ({
        user_id: user.id,
        permission: permissions[1].permission,
        created_at: new Date(),
        updated_at: new Date(),
      })),
    ])

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
      'members',
      users.map((i, index) => ({
        id: uuid.v4(),
        user_id: i.id,
        reputation: 0,
        is_banned: false,
        created_at: new Date(),
        updated_at: new Date(),
        last_active_at: null,
      }))
    )

    const [members] = await queryInterface.sequelize.query(`SELECT id from members;`)

    await queryInterface.bulkInsert('messages', [
      {
        id: uuid.v4(),
        from_member_id: members[0].id,
        to_member_id: members[1].id,
        message: 'test message',
        is_read: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        from_member_id: members[1].id,
        to_member_id: members[0].id,
        message: 'test message 2',
        is_read: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    await queryInterface.bulkInsert('statuses', [
      {
        status: 'approved',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 'cancelled',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 'draft',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    const [statuses] = await queryInterface.sequelize.query(`SELECT status from statuses;`)

    await queryInterface.bulkInsert(
      'posts',
      [
        {
          id: testId1,
          status: statuses[0].status,
          member_id: members[0].id,
          type: `text`,
          image: 'about.jpg',
          title: `Title post test`,
          text: `Text post test`,
          link: null,
          slug: 'slug-test',
          points: 100,
          total_num_comments: 0,
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
