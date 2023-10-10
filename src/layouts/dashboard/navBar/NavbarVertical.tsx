import { Box, Drawer, Stack, styled, useTheme } from '@mui/material';
import Scrollbar from '../../../components/Scrollbar';
import { HEADER, NAVBAR } from '../../../config';
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
import NavSectionVertical from './NavSectionVertical';
import { useNavData } from '../config-navigation';

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
  const navData = useNavData();

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
        <NavSectionVertical navConfig={navData} />
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
              padding: 2.5,
              paddingTop: 10,
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
