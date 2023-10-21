import { Button } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import { TableComponent } from '../../components/table';

export default function SponsorsPage() {
  return (
    <PageContainer
      menu="Sponsors"
      headerButton={
        <Button size="large" variant="contained">
          Ajouter un Sponsor
        </Button>
      }
    >
      <TableComponent />
    </PageContainer>
  );
}
