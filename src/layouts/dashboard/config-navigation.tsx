import { useMemo } from 'react';
// routes
import { PATH_DASHBOARD } from '../../router/paths';
// components
import { ICONS } from '../../utils/icons';

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        title: 'Accueil',
        path: PATH_DASHBOARD.app,
        icon: ICONS.dashboard
      },
      {
        title: 'Quiz',
        path: PATH_DASHBOARD.quiz,
        icon: ICONS.quizz
      },
      {
        title: 'Message',
        path: PATH_DASHBOARD.message,
        icon: ICONS.mail
      },
      {
        title: 'Sponsors',
        path: PATH_DASHBOARD.sponsors,
        icon: ICONS.sponsors
      },
      {
        title: 'Publicités',
        path: PATH_DASHBOARD.publicites,
        icon: ICONS.publicite
      },
      {
        title: 'Rôle et permissions',
        path: PATH_DASHBOARD.role,
        icon: ICONS.lock
      },
      {
        title: 'Utilisateurs',
        path: PATH_DASHBOARD.user,
        icon: ICONS.user
      }
    ],
    []
  );

  return data;
}
