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
          login: 'vitalii-admin',
          email: 'vitalii@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Vitalii',
          last_name: 'Zinoviev',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: 'victor.jpg',
          login: 'victor-editor',
          email: 'victor@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Victor',
          last_name: 'Zagorodnii',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: 'nina.jpg',
          login: 'nina-author',
          email: 'nina@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Nina',
          last_name: 'Zagorodniya',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: null,
          login: 'arthur-author',
          email: 'arthur@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Arthur',
          last_name: 'Zinoviev',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: null,
          login: 'nataliya-subscriber',
          email: 'Nataliya@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'nataliya',
          last_name: 'Zinovieva',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: null,
          login: 'oleg-subscriber',
          email: 'oleg@gmail.com',
          password: bcrypt.hashSync('12345678', 8),
          first_name: 'Oleg',
          last_name: 'Zinoviev',
          created_at: new Date(),
        },
        {
          id: uuid.v4(),
          avatar: null,
          login: 'nadiya-subscriber',
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
        role: roles[Math.min(i, 3)].role,
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
    // / scheduled / / private / auto-draft

    //draft / pending / publish / trash
    // publish — опубликованный пост. Доступен на сайте для просмотра каждому. Этот статус присваивается записям при нажатии на кнопку «Опубликовать».
    // draft — черновики (записи, которые ещё находятся в процессе написания и не готовы к публикации). Для создания черновика нажмите кнопку «Сохранить».
    // pending — пост, ожидающий проверки редактором или администратором. Все записи пользователей с ролью «Участник» отправляются на модерацию.
    // trash — посты, находящиеся в корзине. Для того, чтобы переместить пост в корзину, нажмите на ссылку «Удалить».
    await queryInterface.bulkInsert('statuses', [
      {
        status: 'publish',
        created_at: new Date(),
      },
      {
        status: 'pending',
        created_at: new Date(),
      },
      {
        status: 'draft',
        created_at: new Date(),
      },
      {
        status: 'trash',
        created_at: new Date(),
      },
    ])

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
        ...Array(3)
          .fill(null)
          .map((el, i) => ({
            id: uuid.v4(),
            status: 'draft',
            member_id: members[0].id,
            image: 'about.jpg',
            title: `Title post test`,
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
