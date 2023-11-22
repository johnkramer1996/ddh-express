// Root
const postsRoot = 'posts'
const usersRoot = 'users'
const commentsRoot = 'comments'
const memebersRoot = 'members'
const cabinetRoot = 'cabinet'

// Api Versions
const v1 = 'v1'

export const routes = {
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
  },
  cabinet: {
    user: `/${cabinetRoot}/user`,
    member: `/${cabinetRoot}/member`,
    posts: `/${cabinetRoot}/posts`,
  },
  member: {
    banByLogin: `/${memebersRoot}/:login/ban`,
    findByLogin: `/${memebersRoot}/:login`,
    currentMember: `/${memebersRoot}/currentMember`,
    findPostsByAuthUser: `/${memebersRoot}/posts`,
    findPostsByLogin: `/${memebersRoot}/:login/posts`,
  },
  post: {
    create: `/${postsRoot}`,
    findAll: `/${postsRoot}`,
    findBySlug: `/${postsRoot}/:slug`,
    upvoteBySlug: `/${postsRoot}/:slug/upvote`,
    downvoteBySlug: `/${postsRoot}/:slug/downvote`,
    // updateBySlug: `/${postsRoot}/:slug`,
    // deleteBySlug: `/${postsRoot}/:slug`,
  },
  postComments: {
    create: `/${postsRoot}/:slug/${commentsRoot}/`,
    findAll: `/${postsRoot}/:slug/${commentsRoot}/`,
    findChildrenById: `/${postsRoot}/:slug/${commentsRoot}/:commentId/children`,
    findAllChildrenById: `/${postsRoot}/:slug/${commentsRoot}/:commentId/all-children`,
    findById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    updateById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    deleteById: `/${postsRoot}/:slug/${commentsRoot}/:commentId`,
    upvote: `/${postsRoot}/:slug/${commentsRoot}/:commentId/upvote`,
    downvote: `/${postsRoot}/:slug/${commentsRoot}/:commentId/downvote`,
  },
}
