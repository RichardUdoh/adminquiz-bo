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
  quizGratuit: path(ROOTS_DASHBOARD, '/quiz/gratuit'),
  message: path(ROOTS_DASHBOARD, '/message'),
  sponsors: path(ROOTS_DASHBOARD, '/sponsors'),
  createSponsor: path(ROOTS_DASHBOARD, '/sponsor/create'),
  publicites: path(ROOTS_DASHBOARD, '/publicites'),
  role: path(ROOTS_DASHBOARD, '/role-permissions'),
  user: path(ROOTS_DASHBOARD, '/user')
};
