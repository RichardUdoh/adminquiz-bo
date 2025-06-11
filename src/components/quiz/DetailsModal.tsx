import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { dispatch } from '../../redux/store';
import { getQuestion } from '../../redux/thunks/questionThunk';

const QuestionBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#67B7DC',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '24px',
  color: '#fff',
  position: 'relative',
  '& .editButton': {
    position: 'absolute',
    top: '16px',
    right: '16px',
    color: '#fff'
  }
}));

const ResponseBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  position: 'relative',
  border: '1px solid #E0E0E0',
  '&.correct': {
    backgroundColor: '#E8F5E9',
    borderColor: '#C8E6C9'
  },
  '& .editButton': {
    position: 'absolute',
    top: '50%',
    right: '16px',
    transform: 'translateY(-50%)',
    color: '#F4B400'
  }
}));

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  questionId: string | number;
    index: number;
}

interface Question {
  id: number;
  content: string;
  type: string;
  mediaSupport: string;
  answers: Response[];
}


export default function DetailsModal({ open, onClose, questionId,index }: DetailsModalProps) {
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState<Question | null>(null);
  
  useEffect(() => {
    if (open && questionId) {
      const fetchQuestion = async () => {
        setLoading(true);
        try {
          const response = await dispatch(getQuestion(questionId)).unwrap();
          setQuestionData(response.data);
        } catch (error) {
          console.error('Erreur de récupération :', error);
        } finally {
          setLoading(false);
        }
      };

      fetchQuestion();
    }
  }, [open, questionId]);

  const handleEdit = (type: 'question' | 'response', id?: number) => {
    console.log(`Editing ${type}${id ? ` with id ${id}` : ''}`);
  };

  const handleDelete = () => {
    console.log('Deleting question');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          width: '600px'
        }
      }}
    >
      <DialogTitle sx={{ p: '24px 32px 16px' }}>
        <Typography sx={{ color: '#666', fontWeight: 500 }}>
          Details
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
        {loading ? (
          <Typography>Chargement...</Typography>
        ) : questionData ? (
          <>
            {/* Question */}
            <QuestionBox>
              <Typography variant="subtitle1" gutterBottom>
                Question {String(index + 1).padStart(2, '0')}
              </Typography>
              <Typography>
                {questionData.content}
              </Typography>

                {questionData.type === 'IMAGE' && questionData.mediaSupport && (
                  <img 
                    src={questionData.mediaSupport} 
                    alt={`Media for question ${index + 1}`} 
                    style={{ maxWidth: '100%', maxHeight: 200, marginBottom: 8 }} 
                  />
                )}

              <IconButton
                className="editButton"
                onClick={() => handleEdit('question')}
                size="small"
              >
                <EditIcon />
              </IconButton>
            </QuestionBox>

            <Box>
              {questionData?.answers.map((response:any, index:any) => (
                <Box key={response.id}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: '#666', mb: 1 }}
                  >
                    Réponse {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <ResponseBox className={response.isCorrect ? 'correct' : ''}>
                    <Typography>
                      {response.content}
                    </Typography>
                    <IconButton
                      className="editButton"
                      onClick={() => handleEdit('response', response.id)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </ResponseBox>
                </Box>
              ))}
            </Box>
          </>
        ) : (
          <Typography>Pas de données disponibles.</Typography>
        )}

        {/* Close Button */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: '#999',
              color: '#999',
              '&:hover': {
                borderColor: '#666',
                color: '#666',
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            Fermer
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
