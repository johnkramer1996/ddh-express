module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [roleInit, userInit, memberRoleInit, userAddress, memberInit, statusInit, postInit, postVoteInit, commentInit, commentVoteInit, messageInit] =
      await Promise.all([
        import('../init/role.init.js'),
        import('../init/user.init.js'),
        import('../init/member-role.init.js'),
        import('../init/user-adderess.init.js'),
        import('../init/member.init.js'),
        import('../init/status.init.js'),
        import('../init/post.init.js'),
        import('../init/post-vote.init.js'),
        import('../init/comment.init.js'),
        import('../init/comment-vote.init.js'),
        import('../init/message.init.js'),
      ])

    await queryInterface.createTable('users', userInit.default)
    await queryInterface.createTable('user_addresses', userAddress.default)
    await queryInterface.createTable('roles', roleInit.default)
    await queryInterface.createTable('members', memberInit.default)
    await queryInterface.createTable('member_roles', memberRoleInit.default)
    await queryInterface.createTable('statuses', statusInit.default)
    await queryInterface.createTable('posts', postInit.default)
    await queryInterface.createTable('post_votes', postVoteInit.default)
    await queryInterface.createTable('comments', commentInit.default)
    await queryInterface.createTable('comment_votes', commentVoteInit.default)
    await queryInterface.createTable('messages', messageInit.default)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages')
    await queryInterface.dropTable('comment_votes')
    await queryInterface.dropTable('comments')
    await queryInterface.dropTable('post_votes')
    await queryInterface.dropTable('posts')
    // TODO: DELETE
    await queryInterface.dropTable('states')
    await queryInterface.dropTable('statuses')
    await queryInterface.dropTable('member_roles')
    await queryInterface.dropTable('members')
    await queryInterface.dropTable('roles')
    await queryInterface.dropTable('user_addresses')
    await queryInterface.dropTable('users')
  },
}
