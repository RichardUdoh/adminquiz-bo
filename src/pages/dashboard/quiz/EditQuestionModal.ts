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

export default function EditQuestionModal({ open, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState(0);
  const [question, setQuestion] = useState({
    title: '',
    multipleChoice: false,
    timer: '03:00',
    responses: ['', '', '']
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    setQuestion(prevState => ({
      ...prevState,
      multipleChoice: e.target.checked
    }));
  };

  const handleResponseChange = (index, value) => {
    const newResponses = [...question.responses];
    newResponses[index] = value;
    setQuestion(prevState => ({
      ...prevState,
      responses: newResponses
    }));
  };

  const handleSave = () => {
    onSave(question); // Pass the current question to the parent component (for saving)
    onClose(); // Close the modal
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Editer
      </DialogTitle>
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Texte" />
          <Tab label="Video" />
          <Tab label="Image" />
          <Tab label="Audio" />
        </Tabs>

        {/* Form Content */}
        {activeTab === 0 && (
          <Stack spacing={2} mt={3}>
            <TextField
              label="Question 01"
              variant="outlined"
              fullWidth
              name="title"
              value={question.title}
              onChange={handleInputChange}
              multiline
              rows={3}
            />

            <Stack direction="row" alignItems="center">
              <Checkbox
                checked={question.multipleChoice}
                onChange={handleCheckboxChange}
              />
              <Typography>Choix multiple</Typography>
            </Stack>

            <TextField
              label="Temps"
              variant="outlined"
              type="time"
              name="timer"
              value={question.timer}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />

            <Divider />

            <Typography variant="h6" mt={2}>Réponses</Typography>
            {question.responses.map((response, index) => (
              <Stack key={index} direction="row" alignItems="center" spacing={2}>
                <Radio color="warning" />
                <TextField
                  variant="outlined"
                  fullWidth
                  value={response}
                  onChange={(e) => handleResponseChange(index, e.target.value)}
                  placeholder={`Réponse 0${index + 1}`}
                />
              </Stack>
            ))}
          </Stack>
        )}
      </DialogContent>

      <Stack direction="row" justifyContent="space-between" p={2}>
        <Button variant="outlined" onClick={onClose} sx={{ borderRadius: 2 }}>
          Annuler
        </Button>
        <Button variant="contained" color="warning" sx={{ borderRadius: 2 }} onClick={handleSave}>
          Enregistrer
        </Button>
      </Stack>
    </Dialog>
  );
}
