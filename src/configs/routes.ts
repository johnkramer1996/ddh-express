// Root
const postsRoot = 'posts'
const usersRoot = 'users'
const commentsRoot = 'comments'
const membersRoot = 'members'
const cabinetRoot = 'cabinet'
const messagesRoot = 'messages'

// Api Versions
export const v1 = 'v1'

export const routes = {
  cabinet: {
    user: `/${cabinetRoot}/user`,
    settings: `/${cabinetRoot}/settings`,
    member: `/${cabinetRoot}/member`,
    updateLastActiveMember: `/${cabinetRoot}/member/updateLastActive`,
    posts: `/${cabinetRoot}/posts`,
    countPosts: `/${cabinetRoot}/posts/count`,
    membersForMessage: `/${cabinetRoot}/messages`,
    messagesByLogin: `/${cabinetRoot}/messages/:login`,
  },
  user: {
    create: `/${usersRoot}`,
    findAll: `/${usersRoot}`,
    update: `/${usersRoot}`,
    findByLogin: `/${usersRoot}/:login`,
    deleteByLogin: `/${usersRoot}/:login`,
    recoverByLogin: `/${usersRoot}/:login`,
    login: `/${usersRoot}/login`,
    logout: `/${usersRoot}/logout`,
    refreshToken: `/${usersRoot}/refreshToken`,
    currentUser: `/${usersRoot}/currentUser`,
  },
  member: {
    findAll: `/${membersRoot}`,
    findByLogin: `/${membersRoot}/:login`,
    findPostsByLogin: `/${membersRoot}/:login/posts`,
    attachRoleByLogin: `/${membersRoot}/:login/attachRole`,
    detachRoleByLogin: `/${membersRoot}/:login/detachRole`,
    banByLogin: `/${membersRoot}/:login/ban`,
    recoverByLogin: `/${membersRoot}/:login/recover`,
  },
  post: {
    create: `/${postsRoot}`,
    findAll: `/${postsRoot}`,
    findBySlug: `/${postsRoot}/:slug`,
    updateBySlug: `/${postsRoot}/:slug`,
    moderateBySlug: `/${postsRoot}/:slug/moderate`,
    deleteBySlug: `/${postsRoot}/:slug`,
    upvoteBySlug: `/${postsRoot}/:slug/upvote`,
    downvoteBySlug: `/${postsRoot}/:slug/downvote`,
  },
  postComments: {
    create: `/${postsRoot}/:slug/${commentsRoot}`,
    findAll: `/${postsRoot}/:slug/${commentsRoot}`,
    findChildrenById: `/${postsRoot}/:slug/${commentsRoot}/:commentId/children`,
    findAllChildrenById: `/${postsRoot}/:slug/${commentsRoot}/:commentId/allChildren`,
    findById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    updateById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    deleteById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    upvote: `/${postsRoot}/:slug/${commentsRoot}/:commentId/upvote`,
    downvote: `/${postsRoot}/:slug/${commentsRoot}/:commentId/downvote`,
  },
  message: {
    create: `/${messagesRoot}`,
    updateById: `/${messagesRoot}/:messageId`,
  },
}
