const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOT_MAIN = '/';

// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: ROOTS_AUTH,
  resetPassword: path(ROOTS_AUTH, '/reset-password')
};

export const PATH_PAGE = {
  root: ROOT_MAIN,
  maintenance: '/maintenance',
  page404: '/404',
  page500: '/500'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, '/app'),
  quiz: path(ROOTS_DASHBOARD, '/quiz'),
  user: path(ROOTS_DASHBOARD, '/user'),

  //Message
  messages: path(ROOTS_DASHBOARD, '/messages'),
  createMessage: path(ROOTS_DASHBOARD, '/messages/create'),
  editMessage: path(ROOTS_DASHBOARD, '/messages/:id/edit'),

  //role & permission
  rolePermissions: path(ROOTS_DASHBOARD, '/role-permissions'),
  createRolePermission: path(ROOTS_DASHBOARD, '/role-permissions/create'),
  editRolePermission: path(ROOTS_DASHBOARD, '/role-permissions/:id/edit'),

  //Publicites
  publicites: path(ROOTS_DASHBOARD, '/publicites'),
  createPublicite: path(ROOTS_DASHBOARD, '/publicites/create'),
  editPublicite: path(ROOTS_DASHBOARD, '/publicites/:id/edit'),

  //Sponsor
  sponsors: path(ROOTS_DASHBOARD, '/sponsors'),
  createSponsor: path(ROOTS_DASHBOARD, '/sponsors/create'),
  editSponsor: path(ROOTS_DASHBOARD, '/sponsors/:id/edit'),

  //User
  users: path(ROOTS_DASHBOARD, '/users'),
  createUser: path(ROOTS_DASHBOARD, '/users/create'),
  editUser: path(ROOTS_DASHBOARD, '/users/:id/edit'),

  usagers: path(ROOTS_DASHBOARD, '/usagers'),


  //Quizz
  quizGratuit: path(ROOTS_DASHBOARD, '/quiz/gratuit'),
  quizPayant: path(ROOTS_DASHBOARD, '/quiz/payant'),
  
};
