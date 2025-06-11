import React from 'react';
import { Dialog, DialogContent, IconButton, Stack, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../../components/Iconify';
import moment from 'moment';
import { dispatch } from '../../../redux/store'; // ✅ Assure-toi que ce chemin est correct
import { putStatusDisabledSponsors, putStatusEnableSponsors } from '../../../redux/thunks/sponsorThunk'; // ✅ Assure-toi aussi de ce chemin
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../router/paths';
import { useRouter } from '../../../hooks/use-router';

interface Sponsor {
  id: number;
  label: string;
  startDate: string;
  endDate: string;
  status: string;
  redirectionLink: string;
  image: string;
  description: string;
}

interface SponsorModalProps {
  open: boolean;
  onClose: () => void;
  selectedSponsor: Sponsor | null;
}

const SponsorModal: React.FC<SponsorModalProps> = ({
  open,
  onClose,
  selectedSponsor,
}) => {
  const theme = useTheme();
  const router = useRouter();

  // Vérifier si le sponsor est sélectionné
  if (!selectedSponsor) return null;

  const handleEditSponsor = (id: any) => {
      router.push(PATH_DASHBOARD.editSponsor.replace(':id', String(id)));
  };

  // Fonction pour activer ou désactiver le statut du sponsor
  const handleStatusToggle = async () => {
    if (selectedSponsor.status === 'ACTIVE') {
      await dispatch(putStatusDisabledSponsors(selectedSponsor.id));
    } else {
      await dispatch(putStatusEnableSponsors(selectedSponsor.id));
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
            <img src={selectedSponsor.image} alt={selectedSponsor.label} style={{ width: '100%', height: '100%' }} />
          </Box>

          <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Libellé:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedSponsor.label}</Typography>
          </Stack>

          <Stack direction="row" sx={{ p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Date de début:</Typography>
            <Typography width="50%" variant="subtitle2">{moment(selectedSponsor.startDate).format('DD/MM/YYYY')}</Typography>
          </Stack>

          <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Date de fin:</Typography>
            <Typography width="50%" variant="subtitle2">{moment(selectedSponsor.endDate).format('DD/MM/YYYY')}</Typography>
          </Stack>

          <Stack direction="row" sx={{ p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Lien de redirection:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedSponsor.redirectionLink}</Typography>
          </Stack>

          <Stack direction="row" sx={{ bgcolor: theme.palette.grey[200], p: 2, borderRadius: 2 }} alignItems="center">
            <Typography width="50%" variant="body2" color="text.secondary">Description:</Typography>
            <Typography width="50%" variant="subtitle2">{selectedSponsor.description}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
            <Button variant="contained"
              onClick={() => handleEditSponsor(selectedSponsor.id)}
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
              {selectedSponsor.status === 'ACTIVE' ? 'Désactiver' : 'Activer'}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SponsorModal;
