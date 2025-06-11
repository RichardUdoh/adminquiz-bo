import React from 'react';
import { Dialog, DialogContent, IconButton, Stack, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../../components/Iconify';
import moment from 'moment';
import { dispatch } from '../../../redux/store';
import { putStatusDisabledPublicites, putStatusEnablePublicites } from '../../../redux/thunks/publiciteThunk'; // ✅ Assure-toi aussi de ce chemin
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../router/paths';
import { useRouter } from '../../../hooks/use-router';

interface Publicite {
  id: number;
  label: string;
  startDate: string;
  endDate: string;
  status: string;
  redirectionLink: string;
  image: string;
  description: string;
}

interface PubliciteModalProps {
  open: boolean;
  onClose: () => void;
  selectedPublicite: Publicite | null;
}

const PubliciteModal: React.FC<PubliciteModalProps> = ({
  open,
  onClose,
  selectedPublicite,
}) => {
  const theme = useTheme();
  const router = useRouter();

  // Vérifier si le publicite est sélectionné
  if (!selectedPublicite) return null;

  const handleEditPublicite = (id: any) => {
      router.push(PATH_DASHBOARD.editPublicite.replace(':id', String(id)));
  };

  // Fonction pour activer ou désactiver le statut du publicite
  const handleStatusToggle = async () => {
    if (selectedPublicite.status === 'ACTIVE') {
      await dispatch(putStatusDisabledPublicites(selectedPublicite.id));
    } else {
      await dispatch(putStatusEnablePublicites(selectedPublicite.id));
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
          <Box width={1} height={100} bgcolor={theme.palette.grey[200]} borderRadius={4} overflow="hidden">
            <img
              src={selectedPublicite.image}
              alt={selectedPublicite.label}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain', // Garantit que l'image est entièrement visible et respecte son aspect ratio
              }}
            />
          </Box>

          <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Libellé:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedPublicite.label}</Typography>
          </Stack>

          <Stack direction="row" sx={{ p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Date de début:</Typography>
            <Typography width="50%" variant="subtitle2">{moment(selectedPublicite.startDate).format('DD/MM/YYYY')}</Typography>
          </Stack>

          <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Date de fin:</Typography>
            <Typography width="50%" variant="subtitle2">{moment(selectedPublicite.endDate).format('DD/MM/YYYY')}</Typography>
          </Stack>

          <Stack direction="row" sx={{ p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Lien de redirection:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedPublicite.redirectionLink}</Typography>
          </Stack>

          <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Description:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedPublicite.description}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
            <Button variant="contained"
              onClick={() => handleEditPublicite(selectedPublicite.id)}
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
              {selectedPublicite.status === 'ACTIVE' ? 'Désactiver' : 'Activer'}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default PubliciteModal;
