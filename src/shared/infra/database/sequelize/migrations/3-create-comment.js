module.exports = {
  up: async (queryInterface, Sequelize) => {
    const commentInit = await import('../init/comment.init.js')
    // const postVoteInit = await import('../init/post-vote.init.js')

    await queryInterface.createTable('comments', commentInit.default)
    // await queryInterface.createTable('post_votes', postVoteInit.default)
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('post_votes')
    await queryInterface.dropTable('comments')
  },
}
