// Root
const todosRoot = 'todos'
const postsRoot = 'posts'
const usersRoot = 'users'
const commentsRoot = 'comments'
const memebersRoot = 'members'

// Api Versions
const v1 = 'v1'

export const routes = {
  // todo: {
  //   findAll: `/${todosRoot}`,
  //   findOne: `/${todosRoot}/:todoId`,
  //   createOne: `/${todosRoot}`,
  //   updateOne: `/${todosRoot}/:todoId`,
  //   deleteOne: `/${todosRoot}/:todoId`,
  // },
  user: {
    create: `/${usersRoot}`,
    findAll: `/${usersRoot}`,
    findByLogin: `/${usersRoot}/:login`,
    deleteByLogin: `/${usersRoot}/:login`,
    recoverByLogin: `/${usersRoot}/:login`,
    login: `/${usersRoot}/login`,
    logout: `/${usersRoot}/logout`,
    refreshToken: `/${usersRoot}/refreshToken`,
    currentUser: `/${usersRoot}/currentUser`,
    posts: `/${usersRoot}/:userId/posts`,
  },
  member: {
    findByLogin: `/${memebersRoot}/:login`,
    currentMember: `/${memebersRoot}/currentMember`,
    posts: `/${memebersRoot}/:login/posts`,
  },
  post: {
    create: `/${postsRoot}`,
    findAll: `/${postsRoot}`,
    findById: `/${postsRoot}/:postId`,
    findBySlug: `/${postsRoot}/:slug`,
    updateBySlug: `/${postsRoot}/:postId`,
    deleteBySlug: `/${postsRoot}/:postId`,
    upvoteBySlug: `/${postsRoot}/:slug/upvote`,
    downvoteBySlug: `/${postsRoot}/:slug/downvote`,
  },
  postComments: {
    create: `/${postsRoot}/:slug/${commentsRoot}/`,
    findAll: `/${postsRoot}/:slug/${commentsRoot}/`,
    findById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    updateById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    deleteById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    upvote: `/${postsRoot}/:slug/${commentsRoot}/:commentId/upvote`,
    downvote: `/${postsRoot}/:slug/${commentsRoot}/:commentId/downvote`,
  },
}
