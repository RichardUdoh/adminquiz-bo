import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { PATH_DASHBOARD } from '../router/paths';

type PageContainerType = {
  children: React.ReactNode;
  menu?: string;
  others?: string;
  headerButton?: React.ReactNode;
};

export default function PageContainer({ children, menu, others, headerButton }: PageContainerType) {
  const getMenu = () => {
    if (menu) {
      if (others) {
        return [
          <Link
            underline="hover"
            key="2"
            color="inherit"
          >
            <Typography component={'span'} variant="body2" >
              {menu}
            </Typography>
          </Link>,
          <Typography key="3" color="text.primary">
            <Typography component={'span'} variant="body2" >
              {others}
            </Typography>
          </Typography>
        ];
      }
      return [
        <Typography key="3" color="text.primary">
          <Typography component={'span'} variant="body2" >
            {menu}
          </Typography>
        </Typography>
      ];
    }
    return [];
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={PATH_DASHBOARD.app}>
      <Typography variant="body2">Tableau de board </Typography>
    </Link>,
    ...getMenu()
  ];

  return (
    <Container>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box sx={{ my: 3 }}>
          <Typography variant="h6" >
            {menu || others ? menu || others : 'Tableau de board'}
          </Typography>

          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Box>
        {headerButton}
      </Stack>

      {children}
    </Container>
  );
}
