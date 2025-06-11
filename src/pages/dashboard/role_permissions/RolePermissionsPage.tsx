import { Button } from '@mui/material';
import PageContainer from '../../../components/PageContainer';
import { useRouter } from '../../../hooks/use-router';
import { PATH_DASHBOARD } from '../../../router/paths';
import RolePermissionTable from './RolePermissionsTable';

export default function RolePermissionsPage() {
  
  const router = useRouter();

  const handleViewCreate = () => {
    router.push(PATH_DASHBOARD.createRolePermission);
  };

  return (
    <PageContainer
      menu="Role et Permissions"
      headerButton={
        <Button onClick={handleViewCreate} variant="contained">
          Ajouter un Role et Permission
        </Button>
      }
    >
      <RolePermissionTable />
    </PageContainer>
  );
}
