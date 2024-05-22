'use strict'

const uuid = require('uuid')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const testId1 = `11111111-1111-1111-1111-111111111111`

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: testId1,
          avatar: 'vitalii.jpg',
          login: 'vitalii',
          email: 'vitalii@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Vitalii',
          last_name: 'Zinoviev',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: 'victor.jpg',
          login: 'victor',
          email: 'victor@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Victor',
          last_name: 'Zagorodnii',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: 'nina.jpg',
          login: 'nina',
          email: 'nina@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Nina',
          last_name: 'Zagorodniya',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: null,
          login: 'arthur',
          email: 'arthur@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Arthur',
          last_name: 'Zinoviev',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: null,
          login: 'nataliya',
          email: 'Nataliya@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Nataliya',
          last_name: 'Zinovieva',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: null,
          login: 'oleg',
          email: 'oleg@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Oleg',
          last_name: 'Zinoviev',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: null,
          login: 'nadiya',
          email: 'nadiya@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Nadiya',
          last_name: 'Zinovieva',
          created_at: new Date(),
        },
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
        postal_code: 'postal code ' + index,
        created_at: new Date(),
      }))
    )

    await queryInterface.bulkInsert('roles', [
      {
        role: 'admin',
        created_at: new Date(),
      },
      {
        role: 'editor',
        created_at: new Date(),
      },
      {
        role: 'author',
        created_at: new Date(),
      },
      {
        role: 'contributor',
        created_at: new Date(),
      },
      {
        role: 'subscriber',
        created_at: new Date(),
      },
    ])

    const [roles] = await queryInterface.sequelize.query(`SELECT role from roles;`)

    await queryInterface.bulkInsert(
      'members',
      users.map((i, index) => ({
        id: uuid.v4(),
        user_id: i.id,
        reputation: 0,
        is_banned: false,
        created_at: new Date(),
        last_active_at: null,
      }))
    )

    const [members] = await queryInterface.sequelize.query(`SELECT id from members;`)

    await queryInterface.bulkInsert('member_roles', [
      ...members.map((member, i) => ({
        member_id: member.id,
        role: roles[Math.min(i, 4)].role,
        created_at: new Date(),
      })),
    ])

    await queryInterface.bulkInsert('messages', [
      {
        id: uuid.v4(),
        from_member_id: members[0].id,
        to_member_id: members[1].id,
        message: 'test message',
        is_read: false,
        created_at: new Date(),
      },
      {
        id: uuid.v4(),
        from_member_id: members[1].id,
        to_member_id: members[0].id,
        message: 'test message 2',
        is_read: false,
        created_at: new Date(),
      },
    ])

    await queryInterface.bulkInsert('statuses', [
      {
        order: 1,
        status: 'publish',
        created_at: new Date(),
      },
      {
        order: 2,
        status: 'pending',
        created_at: new Date(),
      },
      {
        order: 3,
        status: 'draft',
        created_at: new Date(),
      },
      {
        order: 4,
        status: 'trash',
        created_at: new Date(),
      },
    ])

    const [statuses] = await queryInterface.sequelize.query(`SELECT status from statuses ORDER BY "order";`)

    await queryInterface.bulkInsert(
      'posts',
      [
        {
          id: testId1,
          status: 'pending',
          member_id: members[0].id,
          image: 'about.jpg',
          title: `Title post test`,
          text: `Text post test`,
          slug: 'slug-test',
          points: 0,
          total_num_comments: 0,
          created_at: new Date(),
        },
        ...statuses.map((status, i) => ({
          id: uuid.v4(),
          status: status.status,
          member_id: members[i].id,
          image: 'about.jpg',
          title: `Title post test ` + i,
          text: `Text post test`,
          slug: 'slug-test' + i,
          points: 0,
          total_num_comments: 0,
          created_at: new Date(),
        })),
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
