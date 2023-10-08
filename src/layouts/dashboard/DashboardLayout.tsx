import { Outlet } from 'react-router-dom';
// import { DashboardHeader, DashboardNavBar } from '../../components/dashboard';
import { Box, styled } from '@mui/material';
import { Suspense } from 'react';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import DashboardHeader from './header';
import NavbarVertical from './navBar/NavbarVertical';
import { NAVBAR } from '../../config';

export default function DashboardLayout() {
  const { collapseClick, isCollapse } = useCollapseDrawer();

  const MainStyle = styled('main')({
    paddingTop: 55,
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
