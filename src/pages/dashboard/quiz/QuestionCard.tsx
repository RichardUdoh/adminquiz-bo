import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Stack, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DetailsModal from '../../../components/quiz/DetailsModal';
import AddQuizModal from '../../../components/quiz/AddQuizModal';



interface QuestionCardProps {
  title: string;
  description: string;
  mediaType?: 'audio' | 'image';
}

const QuestionCard: React.FC<QuestionCardProps> = ({ title, description, mediaType }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);


  return (
    <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      {/* Question Title */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{title}</Typography>
      {/* Media Content (Image or Audio) */}
      {mediaType === 'image' && (
        <Box
          component="img"
          src="/assets/icons/ic_video.png" // Image path placeholder
          alt={title}
          sx={{ width: '100%', height: 140, borderRadius: 1, mb: 1 }}
        />
      )}
      {mediaType === 'audio' && (
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'primary.main', borderRadius: 1, p: 1, mb: 1 }}>
          <IconButton aria-label="play" sx={{ color: 'white' }}>
            <PlayArrowIcon />
          </IconButton>
          <Typography variant="body2" color="white" sx={{ ml: 1 }}>
            1x
          </Typography>
          <Box sx={{ flexGrow: 1, height: 8, backgroundColor: 'white', borderRadius: 1, ml: 2 }} />
        </Box>
      )}

      {/* Question Description */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{description}</Typography>

      {/* Action Buttons (Edit and Delete) */}
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 'auto' }}>
        <IconButton color="error" aria-label="delete">
          <Box
            component="img"
            src="/assets/icons/ic_delete.svg"
            alt="delete"
            sx={{ width: 44, height: 44 }}
          />
        </IconButton>
        {/* Nest the last two buttons in their own Stack */}
        <Stack direction="row" spacing={0}>
          <IconButton color="error" aria-label="edit">
            <Box
              component="img"
              src="/assets/icons/ic_editor.svg"
              alt="edit"
              sx={{ width: 97, height: 43 }}
              onClick={() => setOpenAddModal(true)}
            />
          </IconButton>
          <IconButton color="error" aria-label="delete">
            <Box
              component="img"
              src="/assets/icons/ic_icons.svg"
              alt="details"
              sx={{ width: 44, height: 44 }}
              onClick={() => setOpenDetailModal(true)} 
            />
          </IconButton>
        </Stack>
      </Stack>

      <DetailsModal open={openDetailModal} onClose={() => setOpenDetailModal(false)} />
      <AddQuizModal open={openAddModal} onClose={() => setOpenAddModal(false)} />


    </Card>
  );
};

export default QuestionCard;
