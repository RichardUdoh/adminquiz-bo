import React from 'react';
import { Dialog, DialogContent, IconButton, Stack,Typography,Avatar
, Button, 
Box} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useRouter } from '../hooks/use-router';
import { PATH_DASHBOARD } from '../router/paths';
import Iconify from './Iconify';
import { dispatch } from '../redux/store';

interface User {
  id: number;
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  createdDate: string;
  email: string;
  role: { label: string };
  status: string;
  phoneNumber: string; 
}

interface UserDetailModalProps {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
    onLogout: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  open,
  onClose,
  selectedUser,
    onLogout,
}) => {
  const theme = useTheme();
  const router = useRouter();

  // Vérifier si le user est sélectionné
  if (!selectedUser) return null;

  const handleEditUser = (id: any) => {
      router.push(PATH_DASHBOARD.editUser.replace(':id', String(id)));
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogContent>
        <Stack direction="row" justifyContent="flex-end">
          <IconButton color="primary" onClick={onClose}>
            <Iconify icon="mingcute:close-fill" />
          </IconButton>
        </Stack>

        <Stack spacing={1}>
           

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <Avatar
              src={selectedUser.profilePictureUrl}
              alt="Profile"
                          sx={{ marginLeft: 3, marginRight: 3, width: 150, height: 150 }}
                        />
          </Box>

          <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Nom:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedUser.firstName}</Typography>
          </Stack>

          <Stack direction="row" sx={{ p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Prénoms:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedUser.lastName}</Typography>
          </Stack>

          <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Email:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedUser.email}</Typography>
          </Stack>

          <Stack direction="row" sx={{ p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Télephone:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedUser.phoneNumber}</Typography>
          </Stack>

                    {/* <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Role:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedUser.role.label}</Typography>
          </Stack> */}

          <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
            {/* <Button variant="contained"
              onClick={() => handleEditUser(selectedUser.id)}
              startIcon={<Iconify icon="material-symbols-light:edit-rounded" />}
            >
              Éditer
            </Button> */}
            
                <Button
  variant="contained"
  startIcon={<Iconify icon="hugeicons:logout-04" />}
  color="error"
  onClick={async () => {
    onClose();         // Ferme immédiatement le modal
    await onLogout();  // Déclenche la déconnexion + redirection immédiate
  }}
>
  Se déconnecter
</Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal;
