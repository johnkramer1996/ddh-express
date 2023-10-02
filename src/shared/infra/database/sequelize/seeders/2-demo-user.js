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
        user_id: i.id,
        country: 'country ' + index,
        street: 'street ' + index,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('user_addresses', null, {})
  },
}
