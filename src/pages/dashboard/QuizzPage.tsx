import PageContainer from '../../components/PageContainer';
import { Avatar, Card, Grid, Stack, Typography } from '@mui/material';
import { PATH_DASHBOARD } from '../../router/paths';
import { useNavigate } from 'react-router-dom';

export default function QuizzPage() {
  const nagigate = useNavigate();

  const DATA_WIDGETS = [
    {
      label: 'Gratuits',
      icons: '/assets/icons/ic_test1.svg',
      onNavigate: () => nagigate(PATH_DASHBOARD.quizGratuit)
    },
    {
      label: 'Payants',
      icons: '/assets/icons/ic_paid.svg',
      onNavigate: () => nagigate(PATH_DASHBOARD.quizGratuit)
    },
    {
      label: 'Quiz précommandé',
      icons: '/assets/icons/ic_quiz.svg',
      onNavigate: () => nagigate(PATH_DASHBOARD.quizGratuit)
    }
  ] as const;

  return (
    <PageContainer menu="Quiz">
      <Grid container spacing={2}>
        {DATA_WIDGETS.map((item: any) => (
          <Grid key={item.label} item md={4}>
            <Card sx={{ p: 2.5, cursor: 'pointer' }} onClick={() => item.onNavigate()}>
              <Stack direction={'row'} justifyContent={'left'} spacing={2} alignItems={'center'}>
                <Avatar src={item.icons} alt={item.label} sx={{ width: 80, height: 80 }} />
                <Typography variant="body2">{item.label}</Typography>
              </Stack>
              <Stack direction={'row'} justifyContent={'right'} sx={{ mt: 1 }} spacing={2}>
                <Avatar src="/assets/icons/ic_icons.svg" sx={{ width: 45, height: 45 }} />
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
