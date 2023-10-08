import { Box, Drawer, Stack, styled, useTheme } from '@mui/material';
import Scrollbar from '../../../components/Scrollbar';
import { NAVBAR } from '../../../config';
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter
    })
  }
}));

function NavbarVertical() {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const { isCollapse, collapseClick } = useCollapseDrawer();

  const renderContent = (
    <Stack
      direction="row"
      sx={{
        height: '100vh'
      }}
    >
      <Scrollbar
        sx={{
          height: 1,
          width: '100%',
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        {/* <NavSectionVertical navConfig={getRouteApp()} /> */}
        <>test</>
        <Box sx={{ flexGrow: 1 }} />
      </Scrollbar>
    </Stack>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              padding: 5,
              borderRightStyle: 'unset',
              background: '#fff',
              transition: () =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard
                })
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

export default NavbarVertical;
