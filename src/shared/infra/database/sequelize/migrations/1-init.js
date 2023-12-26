module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [
      permissionInit,
      userInit,
      userPermissionInit,
      userAddress,
      memberInit,
      statusInit,
      postInit,
      postVoteInit,
      commentInit,
      commentVoteInit,
      messageInit,
    ] = await Promise.all([
      import('../init/permission.init.js'),
      import('../init/user.init.js'),
      import('../init/user-permission.init.js'),
      import('../init/user-adderess.init.js'),
      import('../init/member.init.js'),
      import('../init/status.init.js'),
      import('../init/post.init.js'),
      import('../init/post-vote.init.js'),
      import('../init/comment.init.js'),
      import('../init/comment-vote.init.js'),
      import('../init/message.init.js'),
    ])

    await queryInterface.createTable('permissions', permissionInit.default)
    await queryInterface.createTable('users', userInit.default)
    await queryInterface.createTable('user_permissions', userPermissionInit.default)
    await queryInterface.createTable('user_addresses', userAddress.default)
    await queryInterface.createTable('members', memberInit.default)
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
    await queryInterface.dropTable('statuses')
    await queryInterface.dropTable('members')
    await queryInterface.dropTable('user_addresses')
    await queryInterface.dropTable('user_permissions')
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('permissions')
  },
}
