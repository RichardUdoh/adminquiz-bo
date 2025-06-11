import React, { useEffect, useState } from 'react';
import { Grid, Stack, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzes } from '../../../redux/thunks/quizzThunk';
import PageContainer from '../../../components/PageContainer';
import AddQuizModal from '../../../components/quiz/AddQuizModal';
import { selectQuizz } from '../../../redux/selectors/quizz.selector';
import { getQuestionsByQuizz } from '../../../redux/thunks/questionThunk';
import { selectQuestion } from '../../../redux/selectors/question.selector';
import QuestionCard from './QuestionCard';

export default function QuizzesPayantPage() {
  const quizzes = useSelector(selectQuizz);
  const questions = useSelector(selectQuestion);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const type = 'DEFAULT'; 
  const plan = 'PAID'; 

  const dispatch = useDispatch();

  // Charger les quizzes au premier rendu
  useEffect(() => {
    dispatch(getQuizzes({ type, plan }) as any);
  }, [dispatch, type, plan]);

  useEffect(() => {
    if (quizzes?.data?.length > 0 && !selectedQuizId) {
      const firstQuizId = quizzes.data[0].id;
      setSelectedQuizId(firstQuizId);
      dispatch(getQuestionsByQuizz(firstQuizId) as any);
    }
  }, [quizzes, dispatch, selectedQuizId]);

  const handleQuizClick = (quizId: string) => {
    setSelectedQuizId(quizId);
    dispatch(getQuestionsByQuizz(quizId) as any);
  };

  return (
    <PageContainer menu="Payants">
      <Stack spacing={2} mb={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Payants
          </Typography>
          <Button
            variant="contained"
            sx={{ borderRadius: 2 }}
            onClick={() => setOpenAddModal(true)}
          >
            Ajouter une question
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {quizzes?.data?.map((quizz: any) => (
            <Button
              key={quizz.id}
              variant={selectedQuizId === quizz.id ? "contained" : "outlined"}
              color={selectedQuizId === quizz.id ? "warning" : "inherit"}
              sx={{ borderRadius: 2 }}
              onClick={() => handleQuizClick(quizz.id)}
            >
              {quizz.scope}
            </Button>
          ))}
        </Stack>
      </Stack>

      <Grid container spacing={3} justifyContent="center">
        {questions?.data?.length > 0 ? (
          questions.data.map((question: any, index: number) => (
            <Grid key={question.id} item xs={12} sm={6} md={4}>
              <QuestionCard
              index={index}
              id={question.id}
                title={`Question n°${index + 1}`}
                description={question.content}
                mediaType={question.type}
                mediaSupport={question.mediaSupport}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Aucune question à afficher pour ce quiz.
          </Typography>
        )}
      </Grid>

      <AddQuizModal open={openAddModal} quizId={selectedQuizId} onClose={() => setOpenAddModal(false)} />
    </PageContainer>
  );
}
