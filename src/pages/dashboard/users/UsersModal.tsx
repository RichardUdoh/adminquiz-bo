import React from 'react';
import { Dialog, DialogContent, IconButton, Stack,Typography,Avatar
, Button, 
Box} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../../components/Iconify';
import moment from 'moment';
import { dispatch } from '../../../redux/store'; // ✅ Assure-toi que ce chemin est correct
import { putStatusDisabledUsers, putStatusEnableUsers } from '../../../redux/thunks/userThunk'; // ✅ Assure-toi aussi de ce chemin
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../router/paths';
import { useRouter } from '../../../hooks/use-router';

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

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
}

const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  selectedUser,
}) => {
  const theme = useTheme();
  const router = useRouter();

  // Vérifier si le user est sélectionné
  if (!selectedUser) return null;

  const handleEditUser = (id: any) => {
      router.push(PATH_DASHBOARD.editUser.replace(':id', String(id)));
  };

  const handleResendInvitation = async () => {
    if (selectedUser.status === 'ENABLED') {
      await dispatch(putStatusDisabledUsers(selectedUser.id));
    } else {
      await dispatch(putStatusEnableUsers(selectedUser.id));
    }
    onClose(); // Ferme le modal après l'action
  };

  const handleStatusToggle = async () => {
    if (selectedUser.status === 'ENABLED') {
      await dispatch(putStatusDisabledUsers(selectedUser.id));
    } else {
      await dispatch(putStatusEnableUsers(selectedUser.id));
    }
    onClose(); // Ferme le modal après l'action
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

                    <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Role:</Typography>
            {/* <Typography width="50%" variant="subtitle2">{selectedUser.role.label}</Typography> */}
          </Stack>

          <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
            <Button variant="contained"
              onClick={() => handleEditUser(selectedUser.id)}
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
                              {selectedUser.status === 'ENABLED' ? 'Désactiver' : 'Activer'}
                            </Button>

          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
