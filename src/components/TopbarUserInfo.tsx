import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import Iconify from './Iconify';
import useAuth from '../hooks/useAuth';
import { useDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../router/paths';
import { logout } from '../redux/slices/login';
import UsersDetailModal from './UsersDetailModal';

interface User {
  id: number;
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  createdDate: string;
  email: string;
  role: string;
  status: string;
  description: string;
  phoneNumber: string;
}

interface Data {
  id: number;
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  createdDate: string;
  email: string;
  role: string;
  status: string;
  description: string;
  phoneNumber: string;
}

export default function TopbarUserInfo() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [redirectAfterClose, setRedirectAfterClose] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  if (!user) return null;

  const mapDataToUser = (data: Data): User => ({
    ...data,
    phoneNumber: data.phoneNumber || 'N/A',
  });

  const handleOpenModal = () => {
    const userData = mapDataToUser(user); // Utilise l'utilisateur connecté
    setSelectedUser(userData);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

const handleLogout = () => {
  dispatch(logout());
  localStorage.clear();
  sessionStorage.clear();
  navigate(PATH_AUTH.login);
};



  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Iconify icon="clarity:notification-solid-badged" width={20} height={20} />
      <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleOpenModal}>
        <Avatar src={user.profilePictureUrl || ''} alt={user.firstName} sx={{ width: 40, height: 40 }} />
        <Typography variant="subtitle2">{user.firstName} {user.lastName}</Typography>
      </Stack>

      <UsersDetailModal 
        open={open}
        onClose={handleCloseModal}
        selectedUser={selectedUser}
        onLogout={handleLogout}
      />
    </Stack>
  );
}
