module.exports = {
  up: async (queryInterface, Sequelize) => {
    const commentInit = await import('../init/comment.init.js')
    const commentVoteInit = await import('../init/comment-vote.init.js')

    await queryInterface.createTable('comments', commentInit.default)
    await queryInterface.createTable('comment_votes', commentVoteInit.default)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comment_votes')
    await queryInterface.dropTable('comments')
  },
}
