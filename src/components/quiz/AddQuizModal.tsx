import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
  styled,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createQuestionAdmin, filesQuestionMediaSupport, getQuestionsByQuizz, updateQuestionAdmin } from '../../redux/thunks/questionThunk';
import { createAnswerAdmin } from '../../redux/thunks/answerThunk';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const StyledTab = styled(Tab)({
  textTransform: 'none',
  fontWeight: 400,
  fontSize: '16px',
  color: '#666',
  minWidth: 'unset',
  padding: '8px 16px',
  '&.Mui-selected': {
    backgroundColor: '#F4B400',
    color: '#fff',
    borderRadius: '30px'
  }
});

const StyledTabs = styled(Tabs)({
  minHeight: 'unset',
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiTabs-flexContainer': {
    gap: '16px'
  }
});

interface QuestionToEdit {
  id: string;
  content: string;
  isMultipleChoice: boolean;
  responses: string[];
  correctResponses: number[];
  numberOfPointsForCorrectAnswer: number;
  numberOfPointsForWrongAnswer: number;
  numberOfPointsForNoAnswer: number;
  allowedTime: number;
  isJoker: boolean;
  mediaSupport: string | null;
  type: string;
}

interface AddQuizModalProps {
  open: boolean;
  onClose: () => void;
  quizId: any;
  questionToEdit?: QuestionToEdit | null;
}

export default function AddQuizModal({ open, onClose, quizId, questionToEdit }: AddQuizModalProps) {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const types = ['TEXT', 'VIDEO', 'IMAGE', 'AUDIO'];
  const [mediaSupport, setMediaSupport] = useState<string | null>(null);
  const isEdit = Boolean(questionToEdit);

  const formik = useFormik({
    initialValues: {
      content: questionToEdit?.content || '',
      isMultipleChoice: questionToEdit?.isMultipleChoice || false,
      responses: questionToEdit?.responses.length ? questionToEdit.responses : [''],
      correctResponses: questionToEdit?.correctResponses || [],
      numberOfPointsForCorrectAnswer: questionToEdit?.numberOfPointsForCorrectAnswer ?? '',
      numberOfPointsForWrongAnswer: questionToEdit?.numberOfPointsForWrongAnswer ?? '',
      numberOfPointsForNoAnswer: questionToEdit?.numberOfPointsForNoAnswer ?? '',
      allowedTime: questionToEdit?.allowedTime ?? '',
      isJoker: questionToEdit?.isJoker || false,
      type: questionToEdit?.type || 'TEXT',
      mediaSupport: questionToEdit?.mediaSupport ?? '',
      
    },

    validationSchema: Yup.object({
        responses: Yup.array().of(Yup.string().required('Réponse requise')),
        content: Yup.string().required(`Le champ est obligatoire.`),
        numberOfPointsForCorrectAnswer: Yup.number().required(`Le champ est obligatoire.`),
        numberOfPointsForWrongAnswer: Yup.number().required(`Le champ est obligatoire.`),
        numberOfPointsForNoAnswer: Yup.number().required(`Le champ est obligatoire.`),
        allowedTime: Yup.number().required(`Le champ est obligatoire.`),
          mediaSupport: Yup.mixed().when('type', (typeValue: any, schema: Yup.MixedSchema) => {
            if (['VIDEO', 'IMAGE', 'AUDIO'].includes(typeValue)) {
              return schema.required('Le fichier est requis');
            }
            return schema.notRequired().nullable();
          }),
    }),

    onSubmit: async (values) => {
      // Nettoyer les réponses vides
        console.log("Soumission du formulaire avec values:", values);

      const nonEmptyResponses = values.responses
        .map((r, i) => ({ index: i, value: r }))
        .filter(r => r.value.trim() !== '');

      const cleanedResponses = nonEmptyResponses.map(r => r.value);
      const indexMap = nonEmptyResponses.map(r => r.index);

      // Mettre à jour les indices des bonnes réponses après suppression des vides
      const updatedCorrectResponses = values.correctResponses
        .map(i => indexMap.indexOf(i))
        .filter(i => i !== -1);

     
      let questionId = questionToEdit?.id;
      let mediaUrl = null;
      
      if (values.mediaSupport) {
          const formDataFile = new FormData();
          formDataFile.append('file', values.mediaSupport);
          const response = await dispatch(filesQuestionMediaSupport(formDataFile) as any);
            mediaUrl = response.payload.data.url;
        }

      const payload = {
        content: values.content,
        responses: cleanedResponses,
        correctResponses: updatedCorrectResponses,
        numberOfPointsForCorrectAnswer: Number(values.numberOfPointsForCorrectAnswer || 0),
        numberOfPointsForWrongAnswer: Number(values.numberOfPointsForWrongAnswer || 0),
        numberOfPointsForNoAnswer: Number(values.numberOfPointsForNoAnswer || 0),
        allowedTime: Number(values.allowedTime || 0),
        isJoker: values.isJoker,
        type: values.type,
        mediaSupport: mediaUrl,
        quiz: quizId,
      };

      if (questionId) {
        //Update
      } else {
        const res = await dispatch(createQuestionAdmin(payload) as any).unwrap();
        questionId = res?.data?.id;
      }

      if (!questionToEdit && questionId) {
        const responseObjects = cleanedResponses.map((responseText, index) => ({
          content: responseText,
          isCorrect: updatedCorrectResponses.includes(index),
          question: questionId,
        }));

        for (const response of responseObjects) {
          await dispatch(createAnswerAdmin(response) as any).unwrap();        
          dispatch(getQuestionsByQuizz(quizId) as any);
        }
      }
      onClose();
    }
  });

  const handleMediaSupportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    formik.setFieldValue('mediaSupport', file);
    setMediaSupport(file ? file.name : null);
  };

  const addResponseField = () => {
    formik.setFieldValue('responses', [...formik.values.responses, '']);
  };

  const removeResponseField = (index: number) => {
    // Supprimer la réponse
    const updatedResponses = formik.values.responses.filter((_, i) => i !== index);
    formik.setFieldValue('responses', updatedResponses);

    let updatedCorrect = formik.values.correctResponses
      .filter(i => i !== index)
      .map(i => (i > index ? i - 1 : i));
    formik.setFieldValue('correctResponses', updatedCorrect);
  };

  const toggleCorrectResponse = (index: number, checked: boolean) => {
    let current = [...formik.values.correctResponses];
    if (formik.values.isMultipleChoice) {
      if (checked && !current.includes(index)) {
        current.push(index);
      } else {
        current = current.filter(i => i !== index);
      }
    } else {
      current = checked ? [index] : [];
    }
    formik.setFieldValue('correctResponses', current);
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          width: '1000px',
          margin: '32px'
        }
      }}
    >
      <DialogTitle sx={{ p: '24px 32px 16px', color: '#666', fontWeight: 500 }}>
  {isEdit ? 'Modifier la question' : 'Ajouter une question'}
  <IconButton
    aria-label="close"
    onClick={onClose}
    sx={{ position: 'absolute', right: 24, top: 16, color: '#666' }}
  >
    <CloseIcon />
  </IconButton>
</DialogTitle>

      <DialogContent sx={{ p: '0 32px 32px' }}>
        <form onSubmit={formik.handleSubmit}>
          <StyledTabs
            value={tabValue}
                onChange={(e, newValue) => {
                  setTabValue(newValue);
                  formik.setFieldValue('type', types[newValue]);
                }}
            aria-label="quiz content type tabs"
            sx={{ mb: 4 }}
          >
            <StyledTab label="Texte" />
            <StyledTab label="Vidéo" />
            <StyledTab label="Image" />
            <StyledTab label="Audio" />
          </StyledTabs>

          <Box sx={{ display: 'flex', gap: '48px' }}>
            {/* Left side */}
            <Box sx={{ flex: 1 }}>
                            
              {tabValue === 1 && (
                <Stack spacing={1} my={1.5}>
                  <Typography m={0.5} variant="body2">
                    Fichier vidéo
                  </Typography>
                  <TextField
                    fullWidth
                    value={mediaSupport || ''}
                    placeholder="Choisir un fichier"
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <label htmlFor="video-upload">
                            <CloudUploadIcon sx={{ cursor: 'pointer' }} />
                          </label>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.mediaSupport && Boolean(formik.errors.mediaSupport)}
                    helperText={formik.touched.mediaSupport && formik.errors.mediaSupport}
                  />
                  <input
                    type="file"
                    id="video-upload"
                    accept="video/*"
                    style={{ display: 'none' }}
                    onChange={handleMediaSupportChange}
                  />
                </Stack>
              )}

              {tabValue === 2 && (
                <Stack spacing={1} my={1.5}>
                  <Typography m={0.5} variant="body2">
                    Image
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Choisir un fichier"
                    value={mediaSupport || ''}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <label htmlFor="image-upload">
                            <CloudUploadIcon sx={{ cursor: 'pointer' }} />
                          </label>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}
                  />
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleMediaSupportChange}
                  />
                </Stack>
              )}

              {tabValue === 3 && (
                 <Stack spacing={1} my={1.5}>
                  <Typography m={0.5} variant="body2">
                    Fichier audio
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Choisir un fichier"
                    value={mediaSupport || ''}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <label htmlFor="audio-upload">
                            <CloudUploadIcon sx={{ cursor: 'pointer' }} />
                          </label>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}
                  />
                  <input
                    type="file"
                    id="audio-upload"
                    accept="audio/*"
                    style={{ display: 'none' }}
                   onChange={handleMediaSupportChange}

                  />
                </Stack>
              )}
              <Stack spacing={4}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#666', fontWeight: 500, mb: 2 }}>
                    Question
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="content"
                    onBlur={formik.handleBlur}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}
                    placeholder="Saisissez votre question ici..."
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#F8F9FA',
                        '& fieldset': { borderColor: '#E0E0E0' }
                      }
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', fontWeight: 500 }}>
                    Nombre de points en cas de réponse correcte
                  </Typography>
                  <TextField
                    fullWidth
                    name="numberOfPointsForCorrectAnswer"
                    type="number"
                    value={formik.values.numberOfPointsForCorrectAnswer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Points pour une bonne réponse"
                    variant="outlined"
                    error={formik.touched.numberOfPointsForCorrectAnswer && Boolean(formik.errors.numberOfPointsForCorrectAnswer)}
                    helperText={formik.touched.numberOfPointsForCorrectAnswer && formik.errors.numberOfPointsForCorrectAnswer}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#F8F9FA',
                        '& fieldset': { borderColor: '#E0E0E0' }
                      }
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', fontWeight: 500 }}>
                    Temps de la question (en secondes)
                  </Typography>
                  <TextField
                    fullWidth
                    name="allowedTime"
                    type="number"
                    value={formik.values.allowedTime}
                     onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Temps en secondes"
                    variant="outlined"
                    error={formik.touched.allowedTime && Boolean(formik.errors.allowedTime)}
                    helperText={formik.touched.allowedTime && formik.errors.allowedTime}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#F8F9FA',
                        '& fieldset': { borderColor: '#E0E0E0' }
                      }
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', fontWeight: 500 }}>
                    Nombre de points en cas d'erreur
                  </Typography>
                  <TextField
                    fullWidth
                    name="numberOfPointsForWrongAnswer"
                    type="number"
                    value={formik.values.numberOfPointsForWrongAnswer}
                    placeholder="Points en cas de mauvaise réponse"
                        onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    error={formik.touched.numberOfPointsForWrongAnswer && Boolean(formik.errors.numberOfPointsForWrongAnswer)}
                    helperText={formik.touched.numberOfPointsForWrongAnswer && formik.errors.numberOfPointsForWrongAnswer}

                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#F8F9FA',
                        '& fieldset': { borderColor: '#E0E0E0' }
                      }
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', fontWeight: 500 }}>
                    Nombre de points en cas de non-réponse
                  </Typography>
                  <TextField
                    fullWidth
                    name="numberOfPointsForNoAnswer"
                    type="number"
                    value={formik.values.numberOfPointsForNoAnswer}
                    placeholder="Points si pas de réponse"

                     onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    error={formik.touched.numberOfPointsForNoAnswer && Boolean(formik.errors.numberOfPointsForNoAnswer)}
                    helperText={formik.touched.numberOfPointsForNoAnswer && formik.errors.numberOfPointsForNoAnswer}

                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#F8F9FA',
                        '& fieldset': { borderColor: '#E0E0E0' }
                      }
                    }}
                  />
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isJoker}
                      onChange={(e) => formik.setFieldValue('isJoker', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Utiliser le joker"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isMultipleChoice}
                      onChange={(e) => {
                        formik.setFieldValue('isMultipleChoice', e.target.checked);
                        if (!e.target.checked && formik.values.correctResponses.length > 1) {
                          formik.setFieldValue('correctResponses', formik.values.correctResponses.slice(0, 1));
                        }
                      }}
                      color="primary"
                    />
                  }
                  label="Choix multiple"
                />
              </Stack>
            </Box>

            {/* Right side - réponses */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, color: '#666', fontWeight: 500 }}>
                Réponses
              </Typography>

              <Stack spacing={2}>
                {formik.values.responses.map((response, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    
                                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 1 }}>
                       
                        <Checkbox
                          checked={formik.values.correctResponses.includes(index)}
                          onChange={e => toggleCorrectResponse(index, e.target.checked)}
                          color="success"
                        />
                         <Typography
                          variant="caption"
                          sx={{ mb: 0.5, color: '#666', fontWeight: 400, userSelect: 'none', whiteSpace: 'nowrap' }}
                        >
                          Bonne réponse
                        </Typography>
                      </Box>

                    
                    <TextField
                      fullWidth
                      placeholder={`Réponse ${index + 1}`}
                      value={response}
                      onChange={e => {
                        const updatedResponses = [...formik.values.responses];
                        updatedResponses[index] = e.target.value;
                        formik.setFieldValue('responses', updatedResponses);
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: '#F8F9FA',
                          '& fieldset': { borderColor: '#E0E0E0' }
                        }
                      }}
                    />

                    

                    {formik.values.responses.length > 1 && (
                      <IconButton onClick={() => removeResponseField(index)} color="error" size="small" sx={{ p: 0.5 }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ))}

                <Button
                  startIcon={<AddIcon />}
                  onClick={addResponseField}
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    color: '#F4B400',
                    borderColor: '#F4B400',
                    width: 'fit-content',
                    '&:hover': {
                      backgroundColor: '#F4B400',
                      color: '#fff',
                      borderColor: '#F4B400',
                    },
                  }}
                >
                  Ajouter une proposition de réponse
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                          color: '#666',
                          borderColor: '#E0E0E0',
                          '&:hover': {
                            borderColor: '#666'
                          }
                        }}
                      >
                        Annuler
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={formik.isSubmitting}
                        sx={{
                          backgroundColor: '#F4B400',
                          '&:hover': {
                            backgroundColor: '#dba200'
                          }
                        }}
                      >
              {isEdit ? 'Modifier' : 'Enregistrer'}
                {formik.isSubmitting && <CircularProgress size={20} sx={{ color: 'white' }} />}

                      </Button>
                    </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
