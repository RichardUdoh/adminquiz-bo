import { Button } from '@mui/material';
import PageContainer from '../../../components/PageContainer';
import { useRouter } from '../../../hooks/use-router';
import { PATH_DASHBOARD } from '../../../router/paths';
import MessageTable from './MessageTable';

export default function MessagesPage() {
  
  const router = useRouter();

  const handleViewCreate = () => {
    router.push(PATH_DASHBOARD.createMessage);
  };

  return (
    <PageContainer
      menu="Messages"
      headerButton={
        <Button onClick={handleViewCreate} variant="contained">
          Ajouter un Message
        </Button>
      }
    >
      <MessageTable />
    </PageContainer>
  );
}
