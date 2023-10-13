module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [userInit, userAddress, memberInit, postInit, postVoteInit, commentInit, commentVoteInit] = await Promise.all([
      import('../init/user.init.js'),
      import('../init/user-adderess.init.js'),
      import('../init/member.init.js'),
      import('../init/post.init.js'),
      import('../init/post-vote.init.js'),
      import('../init/comment.init.js'),
      import('../init/comment-vote.init.js'),
    ])

    // TODO: join table with users
    await queryInterface.createTable('users', userInit.default)
    await queryInterface.createTable('user_addresses', userAddress.default)
    await queryInterface.createTable('members', memberInit.default)
    await queryInterface.createTable('posts', postInit.default)
    await queryInterface.createTable('post_votes', postVoteInit.default)
    await queryInterface.createTable('comments', commentInit.default)
    await queryInterface.createTable('comment_votes', commentVoteInit.default)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comment_votes')
    await queryInterface.dropTable('comments')
    await queryInterface.dropTable('post_votes')
    await queryInterface.dropTable('posts')
    await queryInterface.dropTable('members')
    await queryInterface.dropTable('user_addresses')
    await queryInterface.dropTable('users')
  },
}
