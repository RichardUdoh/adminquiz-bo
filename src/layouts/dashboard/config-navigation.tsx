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
        icon: ICONS.quizz,
        children: []
      },
      {
        title: 'Message',
        path: PATH_DASHBOARD.messages,
        icon: ICONS.mail,
        children: []
      },
            {
        title: 'Usagers',
        path: PATH_DASHBOARD.usagers,
        icon: ICONS.user,
        children: []
      },
      {
        title: 'Sponsors',
        path: PATH_DASHBOARD.sponsors,
        icon: ICONS.sponsors,
        children: []
      },
      {
        title: 'Publicités',
        path: PATH_DASHBOARD.publicites,
        icon: ICONS.publicite,
        children: []
      },
      {
        title: 'Rôle et permissions',
        path: PATH_DASHBOARD.rolePermissions,
        icon: ICONS.lock,
        children: []
      },
      {
        title: 'Utilisateurs',
        path: PATH_DASHBOARD.users,
        icon: ICONS.user,
        children: []
      }
    ],
    []
  );

  return data;
}
