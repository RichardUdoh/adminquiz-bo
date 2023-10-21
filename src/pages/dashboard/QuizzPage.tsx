import PageContainer from '../../components/PageContainer';
import { Avatar, Card, Grid, Stack, Typography } from '@mui/material';

export default function QuizzPage() {
  const DATA_WIDGETS = [
    {
      label: 'Gratuits',
      icons: '/assets/icons/ic_test1.svg'
    },
    {
      label: 'Payants',
      icons: '/assets/icons/ic_paid.svg'
    },
    {
      label: 'Quiz précommandé',
      icons: '/assets/icons/ic_quiz.svg'
    }
  ];

  return (
    <PageContainer menu="Quiz">
      <Grid container spacing={2}>
        {DATA_WIDGETS.map((item: any) => (
          <Grid key={item.label} item md={4}>
            <Card sx={{ p: 2.5 }}>
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
