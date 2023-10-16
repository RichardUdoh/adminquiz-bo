import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type PageContainerType = {
  children: React.ReactNode;
  menu?: string;
  others?: string;
};

export default function PageContainer({ children, menu, others }: PageContainerType) {
  const getMenu = () => {
    if (menu) {
      if (others) {
        return [
          <Link
            underline="hover"
            key="2"
            color="inherit"
            //href="/material-ui/getting-started/installation/"
            //onClick={handleClick}
          >
            <Typography component={'span'} variant="body2">
              {menu}
            </Typography>
          </Link>,
          <Typography key="3" color="text.primary">
            <Typography component={'span'} variant="body2">
              {others}
            </Typography>
          </Typography>
        ];
      }
      return [
        <Typography key="3" color="text.primary">
          <Typography component={'span'} variant="body2">
            {menu}
          </Typography>
        </Typography>
      ];
    }
    return [];
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      <Typography variant="body2">Tableau de board </Typography>
    </Link>,
    ...getMenu()
  ];

  return (
    <Container>
      <Box sx={{ my: 2.5 }}>
        <Typography variant="h6">{menu || others ? menu || others : 'Tableau de board'}</Typography>

        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Box>
      {children}
    </Container>
  );
}
