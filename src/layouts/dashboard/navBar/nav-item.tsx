// @mui
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
//
import { NavItemProps } from './types';
import { StyledItem, StyledIcon } from './styles';
import RouterLink from '../../../utils/router-link';

// ----------------------------------------------------------------------

type Props = NavItemProps;

export default function NavItem({ item, open, depth, active, externalLink, ...other }: Props) {
  const { title, path, icon, disabled, caption } = item;

  const renderContent = (
    <StyledItem disableGutters disabled={disabled} active={active} depth={depth} {...other}>
      <>{icon && <StyledIcon size={21}>{icon}</StyledIcon>}</>

      <ListItemText
        primary={title}
        secondary={
          caption ? (
            <Tooltip title={caption} placement="top-start">
              <span>{caption}</span>
            </Tooltip>
          ) : null
        }
        primaryTypographyProps={{
          noWrap: true,
          typography: 'body2',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightSemiBold'
        }}
        secondaryTypographyProps={{
          noWrap: true,
          component: 'span',
          typography: 'caption',
          color: 'text.disabled'
        }}
      />
    </StyledItem>
  );

  // Default
  return (
    <Link
      component={RouterLink}
      href={path}
      underline="none"
      color="inherit"
      sx={{
        ...(disabled && {
          cursor: 'default'
        })
      }}
    >
      {renderContent}
    </Link>
  );
}
