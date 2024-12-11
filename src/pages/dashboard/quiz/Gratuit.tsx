// GratuitPage.js
import React from 'react';
import PageContainer from '../../../components/PageContainer';
import { Grid, Stack, Typography, Button, TextField } from '@mui/material';
import QuestionCard from './QuestionCard';
import { useNavigate } from 'react-router-dom';
import AddQuizModal from '../../../components/quiz/AddQuizModal';
import { useState } from 'react';


export default function GratuitPage() {
  const navigate = useNavigate();
  const [openAddModal, setOpenAddModal] = useState(false);


  // Sample data for questions
  const questions = [
    { id: 1, title: "Question 01", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut"},
    { id: 2, title: "Question 02", description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut", mediaType: "image" },
    { id: 3, title: "Question 03", description: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut", mediaType: "audio"  },
    { id: 4, title: "Question 01", description: "Lorem ipsum dolor sit amet...", mediaType: "audio" },
    { id: 5, title: "Question 02", description: "Lorem ipsum dolor sit amet...", mediaType: "image" },
    { id: 6, title: "Question 03", description: "Lorem ipsum dolor sit amet..." },

  ];

  return (
    <PageContainer menu="Gratuits">
      {/* Header Section */}
      <Stack spacing={2} mb={3}>
        {/* Title and Add Question Button */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Gratuits
          </Typography>
          <Button
            variant="contained"
            sx={{ borderRadius: 2 }}
            onClick={() => setOpenAddModal(true)}          >
            Ajouter une question
          </Button>
        </Stack>

        {/* Breadcrumbs and Filters Row */}
        {/* <Typography variant="body2" color="textSecondary">
          Tableau de bord &gt; Quiz &gt; Gratuits
        </Typography> */}

        <Stack direction="row" spacing={2} alignItems="center">
          {/* Search Field */}
          <TextField placeholder="Rechercher" variant="outlined" size="small" sx={{ flex: 1, maxWidth: 200 }} />

          {/* National and International Buttons */}
          <Button variant="outlined" color="inherit" sx={{ borderRadius: 2 }}>
            National
          </Button>
          <Button variant="contained" color="warning" sx={{ borderRadius: 2 }}>
            International
          </Button>
        </Stack>
      </Stack>

      {/* Question Cards Grid */}
      <Grid container spacing={3} justifyContent="center">
        {questions.map((question) => (
          <Grid key={question.id} item xs={12} sm={6} md={4}>
            <QuestionCard {...question} />
          </Grid>
        ))}
      </Grid>

      <AddQuizModal open={openAddModal} onClose={() => setOpenAddModal(false)} />

    </PageContainer>
  );
}
