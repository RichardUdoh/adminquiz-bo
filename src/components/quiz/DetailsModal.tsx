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
}

interface Response {
  id: number;
  text: string;
  isCorrect: boolean;
}

export default function DetailsModal({ open, onClose }: DetailsModalProps) {
  // Mock data - replace with actual data from your application
  const questionData = {
    question: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna",
    responses: [
      { id: 1, text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod", isCorrect: false },
      { id: 2, text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod", isCorrect: true },
      { id: 3, text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod", isCorrect: false }
    ]
  };

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
        <Typography variant="h6" sx={{ color: '#666', fontWeight: 500 }}>
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
        {/* Question */}
        <QuestionBox>
          <Typography variant="subtitle1" gutterBottom>
            Question 01
          </Typography>
          <Typography>
            {questionData.question}
          </Typography>
          <IconButton 
            className="editButton"
            onClick={() => handleEdit('question')}
            size="small"
          >
            <EditIcon />
          </IconButton>
        </QuestionBox>

        {/* Responses */}
        <Box>
          {questionData.responses.map((response, index) => (
            <Box key={response.id}>
              <Typography 
                variant="subtitle2" 
                sx={{ color: '#666', mb: 1 }}
              >
                Réponses {String(index + 1).padStart(2, '0')}
              </Typography>
              <ResponseBox className={response.isCorrect ? 'correct' : ''}>
                <Typography>
                  {response.text}
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
