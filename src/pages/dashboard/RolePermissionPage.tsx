import PageContainer from '../../components/PageContainer';
import { Button } from '@mui/material';
import { TableComponent } from '../../components/table';

export default function RolePermissionPage() {
  return (
    <PageContainer
      menu="Role et permissions"
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
