// @mui
import { alpha, styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
//
import { NavItemProps, NavConfigProps } from './types';

// ----------------------------------------------------------------------

type StyledItemProps = Omit<NavItemProps, 'item'> & {
  config?: NavConfigProps;
};

export const StyledItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active'
})<StyledItemProps>(({ active, depth, theme }) => {
  const deepSubItem = depth > 2;

  const activeStyles = {
    root: {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      fontSize: 16,
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    }
  };

  return {
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    color: theme.palette.text.primary,
    fontSize: 16,

    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2)
    },
    // Active root item
    ...(active && {
      ...activeStyles.root
    }),

    // Deep sub item
    ...(deepSubItem && {
      paddingLeft: theme.spacing(depth)
    })
  };
});

// ----------------------------------------------------------------------

type StyledIconProps = {
  size?: number;
};

export const StyledIcon = styled(ListItemIcon)<StyledIconProps>(({ size }) => ({
  width: size,
  height: size,
  alignItems: 'center',
  justifyContent: 'center'
}));

type StyledDotIconProps = {
  active?: boolean;
};

export const StyledDotIcon = styled('span')<StyledDotIconProps>(({ active, theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: theme.palette.text.disabled,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shorter
  }),
  ...(active && {
    transform: 'scale(2)',
    backgroundColor: theme.palette.primary.main
  })
}));

// ----------------------------------------------------------------------

type StyledSubheaderProps = {
  config: NavConfigProps;
};

export const StyledSubheader = styled(ListSubheader)<StyledSubheaderProps>(({ config, theme }) => ({
  ...theme.typography.overline,
  fontSize: 11,
  cursor: 'pointer',
  display: 'inline-flex',
  padding: config.itemPadding,
  paddingTop: theme.spacing(2),
  marginBottom: config.itemGap,
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.disabled,
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    color: theme.palette.text.primary
  }
}));
