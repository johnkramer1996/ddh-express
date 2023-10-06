module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postInit = await import('../init/post.init.js')
    const postVoteInit = await import('../init/post-vote.init.js')

    await queryInterface.createTable('posts', postInit.default)
    await queryInterface.createTable('post_votes', postVoteInit.default)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_votes')
    await queryInterface.dropTable('posts')
  },
}
