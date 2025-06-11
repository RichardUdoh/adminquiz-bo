import { Button } from '@mui/material';
import PageContainer from '../../../components/PageContainer';
import { useRouter } from '../../../hooks/use-router';
import { PATH_DASHBOARD } from '../../../router/paths';
import PubliciteTable from './PubliciteTable';

export default function PublicitesPage() {
  
  const router = useRouter();

  const handleViewCreate = () => {
    router.push(PATH_DASHBOARD.createPublicite);
  };

  return (
    <PageContainer
      menu="Publicites"
      headerButton={
        <Button onClick={handleViewCreate} variant="contained">
          Ajouter un Publicite
        </Button>
      }
    >
      <PubliciteTable />
    </PageContainer>
  );
}
