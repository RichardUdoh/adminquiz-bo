import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Card
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../../components/Iconify';
import { dispatch } from '../../../redux/store';
import {
  putStatusDisabledRolePermissions,
  putStatusEnableRolePermissions
} from '../../../redux/thunks/rolePermissionThunk';
import { PATH_DASHBOARD } from '../../../router/paths';
import { useRouter } from '../../../hooks/use-router';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Permission {
  id: string;
  label: string;
}

interface Menu {
  id: string;
  name: string;
  permissions: Permission[];
}

interface RolePermission {
  id: number;
  label: string;
  createdDate: string;
  status: string;
  menus?: Menu[]; // Ajout des menus et leurs permissions
}

interface RolePermissionModalProps {
  open: boolean;
  onClose: () => void;
  selectedRolePermission: RolePermission | null;
}

const RolePermissionModal: React.FC<RolePermissionModalProps> = ({
  open,
  onClose,
  selectedRolePermission
}) => {
  const theme = useTheme();
  const router = useRouter();

  if (!selectedRolePermission) return null;

  const handleEditRolePermission = (id: number) => {
    router.push(PATH_DASHBOARD.editRolePermission.replace(':id', String(id)));
  };

  const handleStatusToggle = async () => {
    if (selectedRolePermission.status === 'ACTIVE') {
      await dispatch(putStatusDisabledRolePermissions(selectedRolePermission.id));
    } else {
      await dispatch(putStatusEnableRolePermissions(selectedRolePermission.id));
    }
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton color="primary" onClick={onClose}>
            <Iconify icon="mingcute:close-fill" />
          </IconButton>
        </Stack>

        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }}
            alignItems="center"
          >
            <Typography width="50%" variant="body2" color="text.secondary">
              Libellé:
            </Typography>
            <Typography width="50%" variant="subtitle2">{selectedRolePermission.label}</Typography>
          </Stack>

                <Typography variant="body2" sx={{ color: '#34b4e2', pr: 2, fontWeight: 'bold' }}>
                  Privilèges
                </Typography>
          {/* Accordions des menus et fonctionnalités */}
          {selectedRolePermission.menus?.map((menu) => (
            <Box sx={{  mb: 2,}}>
              <Accordion key={menu.id} sx={{  bgcolor: '#f5f5f5', borderRadius: 2, }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">{menu.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {menu.permissions.map((permission) => (
                      <ListItem key={permission.id}>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={permission.label} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}

          <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
            <Button
              variant="contained"
              onClick={() => handleEditRolePermission(selectedRolePermission.id)}
              startIcon={<Iconify icon="material-symbols-light:edit-rounded" />}
            >
              Éditer
            </Button>
            <Button
              startIcon={<Iconify icon="hugeicons:logout-04" />}
              variant="contained"
              color="error"
              onClick={handleStatusToggle}
            >
              {selectedRolePermission.status === 'ACTIVE' ? 'Désactiver' : 'Activer'}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default RolePermissionModal;
