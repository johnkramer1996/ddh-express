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

// Api Versions
const v1 = 'v1'

export const routes = {
  todo: {
    findAll: `/${todosRoot}`,
    findOne: `/${todosRoot}/:todoId`,
    createOne: `/${todosRoot}`,
    updateOne: `/${todosRoot}/:todoId`,
    deleteOne: `/${todosRoot}/:todoId`,
  },
  post: {
    findAll: `/${postsRoot}`,
    findOne: `/${postsRoot}/:postId`,
    findOneBySlug: `/${postsRoot}/:slug`,
    createOne: `/${postsRoot}`,
    upvote: `/${postsRoot}/:slug/upvote`,
    downvote: `/${postsRoot}/:slug/downvote`,
    updateOne: `/${postsRoot}/:postId`,
    deleteOne: `/${postsRoot}/:postId`,
  },
  user: {
    findAll: `/${usersRoot}`,
    findOne: `/${usersRoot}/:userId`,
    createOne: `/${usersRoot}`,
    updateOne: `/${usersRoot}/:todoId`,
    deleteOne: `/${usersRoot}/:todoId`,
    login: `/${usersRoot}/login`,
    logout: `/${usersRoot}/logout`,
    refreshToken: `/${usersRoot}/refreshToken`,
    currentUser: `/${usersRoot}/currentUser`,
  },
}
