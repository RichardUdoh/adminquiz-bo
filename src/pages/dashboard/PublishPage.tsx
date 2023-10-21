import PageContainer from '../../components/PageContainer';
import { Button } from '@mui/material';
import { TableComponent } from '../../components/table';

export default function PublishPage() {
  return (
    <PageContainer
      menu="Publicités"
      headerButton={
        <Button size="large" variant="contained">
          Ajouter
        </Button>
      }
    >
      <TableComponent />
    </PageContainer>
  );
}
