import { useState } from 'react';
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
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Styled components
const StyledTab = styled(Tab)(({ theme }) => ({
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
}));

const StyledTabs = styled(Tabs)({
  minHeight: 'unset',
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiTabs-flexContainer': {
    gap: '16px'
  }
});

interface AddQuizModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddQuizModal({ open, onClose }: AddQuizModalProps) {
  const [tabValue, setTabValue] = useState(0);

  const formik = useFormik({
    initialValues: {
      question: '',
      isMultipleChoice: false,
      responses: ['', '', ''],
      correctResponse: 0
    },
    validationSchema: Yup.object({
      question: Yup.string().required('Question is required'),
      responses: Yup.array().of(Yup.string().required('Response is required'))
    }),
    onSubmit: (values) => {
      // console.log('values', values);
      onClose();
    }
  });

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
      <DialogTitle sx={{ p: '24px 32px 16px' }}>
        <Typography variant="h6" sx={{ color: '#666', fontWeight: 500 }}>
          Ajouter
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 24,
            top: 16,
            color: '#666'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: '0 32px 32px' }}>
        <form onSubmit={formik.handleSubmit}>
          <StyledTabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            aria-label="quiz content type tabs"
            sx={{ mb: 4 }}
          >
            <StyledTab label="Texte" />
            <StyledTab label="Video" />
            <StyledTab label="Image" />
            <StyledTab label="Audio" />
          </StyledTabs>

          <Box sx={{ display: 'flex', gap: '48px' }}>
            {/* Left side */}
            <Box sx={{ flex: 1 }}>
              <Stack spacing={4}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: '#666', fontWeight: 500, mb: 2 }}
                  >
                    Questions 01
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna"
                    name="question"
                    value={formik.values.question}
                    onChange={formik.handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#F8F9FA',
                        '& fieldset': {
                          borderColor: '#E0E0E0'
                        }
                      }
                    }}
                  />
                </Box>

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.isMultipleChoice}
                        onChange={formik.handleChange}
                        name="isMultipleChoice"
                        sx={{
                          color: '#666',
                          '&.Mui-checked': {
                            color: '#F4B400'
                          }
                        }}
                      />
                    }
                    label={<Typography sx={{ color: '#666' }}>Choix multiple</Typography>}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: '#666', fontWeight: 500, mb: 2 }}
                  >
                    Temps
                  </Typography>
                  <Typography sx={{ color: '#666' }}>03:00</Typography>
                </Box>
              </Stack>
            </Box>

            {/* Right side */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: '#666', fontWeight: 500, mb: 2 }}
              >
                Reponse 01
              </Typography>
              {formik.values.responses.map((response, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px'
                  }}
                >
                  <Stack spacing={2}>
                    <Typography sx={{ color: '#666' }}>Bonne réponse</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        fullWidth
                        name={`responses.${index}`}
                        value={response}
                        onChange={formik.handleChange}
                        placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            fontSize: '14px',
                            color: '#666'
                          }
                        }}
                      />
                      <Checkbox
                        checked={formik.values.correctResponse === index}
                        onChange={() => formik.setFieldValue('correctResponse', index)}
                        sx={{
                          color: '#666',
                          '&.Mui-checked': {
                            color: '#F4B400'
                          }
                        }}
                      />
                    </Box>
                  </Stack>
                </Box>
              ))}
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
              sx={{
                backgroundColor: '#F4B400',
                '&:hover': {
                  backgroundColor: '#dba200'
                }
              }}
            >
              Enregistrer
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
