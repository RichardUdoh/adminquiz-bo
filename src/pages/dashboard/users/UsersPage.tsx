import { Button } from '@mui/material';
import PageContainer from '../../../components/PageContainer';
import { useRouter } from '../../../hooks/use-router';
import { PATH_DASHBOARD } from '../../../router/paths';
import UserTable from './UserTable';

export default function UsersPage() {
  
  const router = useRouter();

  const handleViewCreate = () => {
    router.push(PATH_DASHBOARD.createUser);
  };

  return (
    <PageContainer
      menu="Utilisateurs"
      headerButton={
        <Button onClick={handleViewCreate} variant="contained">
          Ajouter un Utilisateur
        </Button>
      }
    >
      <UserTable />
    </PageContainer>
  );
}
