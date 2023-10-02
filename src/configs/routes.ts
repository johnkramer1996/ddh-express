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
const usersRoot = 'users'

// Api Versions
const v1 = 'v1'

export const routesV1 = {
  todo: {
    findAll: `/${todosRoot}`,
    findOne: `/${todosRoot}/:todoId`,
    createOne: `/${todosRoot}`,
    updateOne: `/${todosRoot}/:todoId`,
    deleteOne: `/${todosRoot}/:todoId`,
  },
  user: {
    findAll: `/${usersRoot}`,
    findOne: `/${usersRoot}/:userId`,
    login: `/${usersRoot}/login`,
    logout: `/${usersRoot}/logout`,
    refreshToken: `/${usersRoot}/refreshToken`,
    currentUser: `/${usersRoot}/currentUser`,
  },
}

console.log(routesV1.user.logout)
