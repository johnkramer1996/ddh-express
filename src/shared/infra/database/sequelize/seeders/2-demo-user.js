'use strict'

const uuid = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuid.v4(),
          email: `vitalii@gmail.com`,
          password: '12345',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...Array(10)
          .fill(null)
          .map((_, i) => ({
            id: uuid.v4(),
            email: `user${i}@gmail.com`,
            password: '12345',
            createdAt: new Date(),
            updatedAt: new Date(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('user_addresses', null, {})
  },
}
