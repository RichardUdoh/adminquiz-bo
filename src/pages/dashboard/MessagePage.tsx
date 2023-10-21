import { Button } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import { TableComponent } from '../../components/table';

export default function MessagePage() {
  return (
    <PageContainer
      menu="Messages"
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
