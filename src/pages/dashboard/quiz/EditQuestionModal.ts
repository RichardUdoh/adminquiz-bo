import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  TextField,
  Checkbox,
  Typography,
  Stack,
  Button,
  Divider,
  Radio
} from '@mui/material';

export default function EditQuestionModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Editer
        {/* Add a close button in the top-right corner */}
      </DialogTitle>
      <DialogContent>
        {/* Tab Navigation */}
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Texte" />
          <Tab label="Video" />
          <Tab label="Image" />
          <Tab label="Audio" />
        </Tabs>

        {/* Form Content */}
        {activeTab === 0 && (
          <Stack spacing={2} mt={3}>
            {/* Question Title Input */}
            <TextField
              label="Question 01"
              variant="outlined"
              fullWidth
              defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna"
              multiline
              rows={3}
            />

            {/* Checkbox for Multiple Choice */}
            <Stack direction="row" alignItems="center">
              <Checkbox />
              <Typography>Choix multiple</Typography>
            </Stack>

            {/* Timer Input */}
            <TextField
              label="Temps"
              variant="outlined"
              type="time"
              defaultValue="03:00"
              InputLabelProps={{ shrink: true }}
            />

            <Divider />

            {/* Responses Section */}
            <Typography variant="h6" mt={2}>Réponses</Typography>
            {[1, 2, 3].map((num) => (
              <Stack key={num} direction="row" alignItems="center" spacing={2}>
                <Radio color="warning" />
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder={`Réponse 0${num}`}
                  defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna"
                />
              </Stack>
            ))}
          </Stack>
        )}
      </DialogContent>

      {/* Footer Action Buttons */}
      <Stack direction="row" justifyContent="space-between" p={2}>
        <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 2 }}>
          Annuler
        </Button>
        <Button variant="contained" color="warning" sx={{ borderRadius: 2 }}>
          Enregistrer
        </Button>
      </Stack>
    </Dialog>
  );
}
