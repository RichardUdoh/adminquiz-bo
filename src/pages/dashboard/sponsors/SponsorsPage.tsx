import { Button } from '@mui/material';
import PageContainer from '../../../components/PageContainer';
import { useRouter } from '../../../hooks/use-router';
import { PATH_DASHBOARD } from '../../../router/paths';
import SponsorTable from './SponsorTable';

export default function SponsorsPage() {
  
  const router = useRouter();

  const handleViewCreate = () => {
    router.push(PATH_DASHBOARD.createSponsor);
  };

  return (
    <PageContainer
      menu="Sponsors"
      headerButton={
        <Button onClick={handleViewCreate} variant="contained">
          Ajouter un Sponsor
        </Button>
      }
    >
      <SponsorTable />
    </PageContainer>
  );
}
