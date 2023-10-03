module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('users', {
        id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        is_email_verified: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        is_admin_user: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        is_deleted: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        last_login: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
      }),

      queryInterface.createTable('user_addresses', {
        user_id: {
          primaryKey: true,
          type: Sequelize.DataTypes.UUID,
          onDelete: 'CASCADE',
          references: {
            model: {
              tableName: 'users',
              schema: 'public',
            },
            key: 'id',
          },
          allowNull: false,
        },
        country: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        street: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
      }),
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
    return queryInterface.dropTable('user_addresses')
  },
}
