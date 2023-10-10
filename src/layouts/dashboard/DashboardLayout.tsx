import { Outlet } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { Suspense } from 'react';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import DashboardHeader from './header';
import NavbarVertical from './navBar/NavbarVertical';
import { HEADER, NAVBAR } from '../../config';

export default function DashboardLayout() {
  const { collapseClick, isCollapse } = useCollapseDrawer();

  const MainStyle = styled('main')({
    paddingTop: HEADER.MOBILE_HEIGHT,
    paddingLeft: isCollapse ? NAVBAR.DASHBOARD_WIDTH : NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    width: '100%',
    background: '#F9F9F9'
  });

  return (
    <Box display={{ lg: 'flex' }} minHeight={{ lg: 1 }} bgcolor="#F9F9F9">
      <DashboardHeader isCollapse={isCollapse} />
      <NavbarVertical />
      <MainStyle>
        <Suspense fallback="loading...">
          <Outlet
            context={{
              collapseClick,
              isCollapse
            }}
          />
        </Suspense>
      </MainStyle>
    </Box>
  );
}
