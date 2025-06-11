import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Stack, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DetailsModal from '../../../components/quiz/DetailsModal';
import AddQuizModal from '../../../components/quiz/AddQuizModal';

interface QuestionCardProps {
  id: string | number;
  title: string;
  description: string;
  mediaType?: 'IMAGE' | 'AUDIO' | 'VIDEO';
  mediaSupport?: string;
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ id, title, description, mediaType,mediaSupport,index }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{title}</Typography>

      {mediaType === 'IMAGE' && (
        <Box
          component="img"
          src={mediaSupport}
          alt={title}
          sx={{ width: '100%', height: 140, borderRadius: 1, mb: 1 }}
        />
      )}

     {mediaType === 'AUDIO' && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'primary.main',
              borderRadius: 1,
              p: 1,
              mb: 1,
            }}
          >
            <audio controls style={{ width: '100%', backgroundColor: 'transparent' }}>
              <source src={mediaSupport} type="audio/mpeg" />
              Votre navigateur ne supporte pas l’élément audio.
            </audio>
          </Box>
        )}

        {mediaType === 'VIDEO' && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'primary.main',
              borderRadius: 1,
              p: 1,
              mb: 1,
            }}
          >
            <video controls style={{ width: '100%', borderRadius: 8 }}>
              <source src={mediaSupport} type="video/mp4" />
              Votre navigateur ne supporte pas l’élément vidéo.
            </video>
          </Box>
        )}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{description}</Typography>

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 'auto' }}>
        <IconButton color="error" aria-label="delete">
          <Box
            component="img"
            src="/assets/icons/ic_delete.svg"
            alt="delete"
            sx={{ width: 44, height: 44 }}
          />
        </IconButton>

        <Stack direction="row" spacing={0}>
          <IconButton color="error" aria-label="edit" onClick={() => setOpenAddModal(true)}>
            <Box
              component="img"
              src="/assets/icons/ic_editor.svg"
              alt="edit"
              sx={{ width: 97, height: 43 }}
            />
          </IconButton>
          <IconButton color="error" aria-label="details" onClick={() => setOpenDetailModal(true)}>
            <Box
              component="img"
              src="/assets/icons/ic_icons.svg"
              alt="details"
              sx={{ width: 44, height: 44 }}
            />
          </IconButton>
        </Stack>
      </Stack>

      <DetailsModal index={index} open={openDetailModal} onClose={() => setOpenDetailModal(false)} questionId={id} />
    </Card>
  );
};

export default QuestionCard;
