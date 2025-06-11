import { Button } from '@mui/material';
import PageContainer from '../../../components/PageContainer';
import { useRouter } from '../../../hooks/use-router';
import { PATH_DASHBOARD } from '../../../router/paths';
import UserTable from './UserTable';

export default function UsagersPage() {
  
  const router = useRouter();

  return (
    <PageContainer
      menu="Usagers"
    >
      <UserTable />
    </PageContainer>
  );
}
