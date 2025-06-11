import React from 'react';
import { Dialog, DialogContent, IconButton, Stack, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../../components/Iconify';
import moment from 'moment';
import { dispatch } from '../../../redux/store';
import { putStatusDisabledMessages, putStatusEnableMessages } from '../../../redux/thunks/messageThunk'; // ✅ Assure-toi aussi de ce chemin
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../router/paths';
import { useRouter } from '../../../hooks/use-router';

interface Message {
  id: number;
  label: string;
  image: string;
  description: string;
}

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
  selectedMessage: Message | null;
}

const MessageModal: React.FC<MessageModalProps> = ({
  open,
  onClose,
  selectedMessage,
}) => {
  const theme = useTheme();
  const router = useRouter();

  // Vérifier si le message est sélectionné
  if (!selectedMessage) return null;

  const handleEditMessage = (id: any) => {
      router.push(PATH_DASHBOARD.editMessage.replace(':id', String(id)));
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
          <Box width={1} height={100} bgcolor={theme.palette.grey[200]} borderRadius={4} overflow="hidden">
            <img src={selectedMessage.image} alt={selectedMessage.label} style={{ width: '100%', height: '100%' }} />
          </Box>

          <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Titre:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedMessage.label}</Typography>
          </Stack>

          <Stack direction="row" sx={{ p: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Description:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedMessage.description}</Typography>
          </Stack>


          <Stack direction="row" sx={{ p: 2 }} alignItems="center">
            <Typography width="100%" variant="body2" sx={{ color: '#34b4e2'}}>Utilisateur concernés</Typography>
          </Stack>

          <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
            <Button variant="contained"
              onClick={() => handleEditMessage(selectedMessage.id)}
              startIcon={<Iconify icon="material-symbols-light:edit-rounded" />}
            >
              Éditer
            </Button>
            <Button
              startIcon={<Iconify icon="material-symbols-light:delete-rounded" />}
              variant="contained"
              color="error"
              // onClick={handleStatusToggle}
            >
              Supprimer
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
