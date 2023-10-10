import { AppBar, Container, Toolbar, Typography, styled } from '@mui/material';
import { HEADER } from '../../../config';
import { useOffSetTop } from '../../../hooks/useOffSetTop';
import NavUser from './NavUser';

type DashboardHeaderProps = {
  onOpenSidebar?: () => void;
  isCollapse?: boolean;
  verticalLayout?: boolean;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  isCollapse = false,
  verticalLayout = false
}) => {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Container sx={{ pt: 1 }}>
        <Toolbar
          sx={{
            minHeight: '100% !important',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography color={`white`} variant="h6">
            Logo
          </Typography>
          <NavUser />
        </Toolbar>
      </Container>
    </RootStyle>
  );
};
export default DashboardHeader;

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout'
})(
  ({
    isCollapse,
    isOffset,
    verticalLayout,
    theme
  }: {
    isCollapse: boolean;
    isOffset: boolean;
    verticalLayout: any;
    theme?: any;
  }) => ({
    boxShadow: 'none',
    height: HEADER.MOBILE_HEIGHT,
    zIndex: theme.zIndex.appBar + 110,
    background: theme.palette.gradients.home,
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shorter
    }),
    [theme.breakpoints.up('lg')]: {
      // height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
      width: `100%`,
      ...(isCollapse &&
        {
          // width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`
        }),
      ...(isOffset && {
        height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT
      }),
      ...(verticalLayout && {
        width: '100%',
        height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
        backgroundColor: theme.palette.background.default
      })
    }
  })
);
