export const todoUrls = {
  root: '/todos',
  findAll: '/',
  findOne: '/:todoId',
  createOne: '/',
  updateOne: '/:todoId',
  deleteOne: '/:todoId',
}

export const userUrls = {
  root: '/users',
  findAll: '/',
  login: '/login',
  logout: '/logout',
  refreshToken: '/refreshToken',
  currentUser: '/currentUser',
  // findOne: '/:todoId',
  // createOne: '/',
  // updateOne: '/:todoId',
  // deleteOne: '/:todoId',
}

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
  post: {
    findAll: `/${postsRoot}`,
    findById: `/${postsRoot}/:postId`,
    findBySlug: `/${postsRoot}/:slug`,
    create: `/${postsRoot}`,
    update: `/${postsRoot}/:postId`,
    delete: `/${postsRoot}/:postId`,
    upvote: `/${postsRoot}/:slug/upvote`,
    downvote: `/${postsRoot}/:slug/downvote`,
  },
  postComments: {
    findAll: `/${postsRoot}/:slug/${commentsRoot}/`,
    findById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    create: `/${postsRoot}/:slug/${commentsRoot}/`,
    updateById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    deleteById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    upvote: `/${postsRoot}/:slug/${commentsRoot}/:commentId/upvote`,
    downvote: `/${postsRoot}/:slug/${commentsRoot}/:commentId/downvote`,
  },
  member: {
    findByLogin: `/${memebersRoot}/:login`,
    posts: `/${memebersRoot}/:memberId/posts`,
  },
  user: {
    findAll: `/${usersRoot}`,
    findById: `/${usersRoot}/:userId`,
    create: `/${usersRoot}`,
    deleteById: `/${usersRoot}/:userId`,
    recoverById: `/${usersRoot}/:userId`,
    login: `/${usersRoot}/login`,
    logout: `/${usersRoot}/logout`,
    refreshToken: `/${usersRoot}/refreshToken`,
    currentUser: `/${usersRoot}/currentUser`,
    posts: `/${usersRoot}/:userId/posts`,
  },
}
