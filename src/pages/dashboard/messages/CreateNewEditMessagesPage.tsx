import React, { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import {
  Button,
  Card,
  InputAdornment,
  TextField,
  Typography,
  Box,
  Stack
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { FTextField } from '../../../components/formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import {
  createMessageAdmin,
  filesMessagesLogo,
  getMessage,
  updateMessageAdmin,
} from '../../../redux/thunks/messageThunk';
import { dispatch } from '../../../redux/store';
import { useRouter } from '../../../hooks/use-router';
import { PATH_DASHBOARD } from '../../../router/paths';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';

const FormSchema = Yup.object().shape({
  label: Yup.string().required(`Le champ est obligatoire.`),
  image: Yup.mixed().required(`Le champ est obligatoire.`),
  description: Yup.string().required(`Le champ est obligatoire.`),
  endDate: Yup.string().required(`Le champ est obligatoire.`),
  startDate: Yup.string().required(`Le champ est obligatoire.`),
  redirectionLink: Yup.string().required(`Le champ est obligatoire.`)
});

export default function CreateNewEditMessagesPage() {
  const router = useRouter();
  const { id } = useParams();
  const [fileName, setFileName] = useState<string | null>(null);

  const [initialValues, setInitialValues] = useState({
    label: '',
    image: null,
    description: '',
    startDate: '',
    endDate: '',
    redirectionLink: ''
  });

  useEffect(() => {
    const fetchMessage = async () => {
      if (id) {
        const response = await dispatch(getMessage(id));
        const message = response?.payload?.data;

        if (message) {
          setInitialValues({
            label: message.label || '',
            image: null,
            description: message.description || '',
            startDate: message.startDate?.slice(0, 10) || '',
            endDate: message.endDate?.slice(0, 10) || '',
            redirectionLink: message.redirectionLink || ''
          });

          setFileName(message.image?.split('/').pop() || null);
        }
      }
    };

    fetchMessage();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      try {
        if (values.image) {
          const formDataFile = new FormData();
          formDataFile.append('file', values.image);
          const response: any = await dispatch(filesMessagesLogo(formDataFile));
          if (response?.payload?.data?.url) {
            values.image = response.payload.data.url;
          }
        }

        if (id) {
          await dispatch(updateMessageAdmin({ id, dataForm: values }));
        } else {
          await dispatch(createMessageAdmin(values));
        }

        router.push(PATH_DASHBOARD.messages);
      } catch (error) {
        // Gérer l'erreur ici
      }
    }
  });

  const { handleSubmit, setFieldValue, errors, touched, isSubmitting } = formik;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFieldValue('image', file);
    setFileName(file ? file.name : null);
  };

  return (
    <PageContainer menu={id ? "Modifier un message" : "Ajouter un message"}>
      <Card sx={{ p: 2 }}>
        <Box sx={{ margin: 'auto', width: { xs: '100%', md: '64%' }, pt: 2 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit}>

              <Box
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }}
              >
                <FTextField
                  name="redirectionLink"
                  label="Titre"
                  placeholder="Titre"
                />
                <Stack spacing={1} my={1.5}>
                  <Typography m={0.5} variant="body2">
                    Image
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Choisir un fichier"
                    value={fileName || ''}
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
                    error={Boolean(touched.image && errors.image)}
                    helperText={touched.image && errors.image}
                  />
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  
                </Stack>

                    
                
              </Box>

              <FTextField name="description" multiline rows={6} label="Description" />
                        <Stack direction="row" alignItems="center">
                          <Typography width="100%" variant="body2" sx={{ color: '#34b4e2'}}>Cochez les types d'utilisateurs à envoyer</Typography>
                        </Stack>


                        
              <Stack my={4} direction="row" justifyContent="center" spacing={2} alignItems="center">
                <Button onClick={() => router.back()} size="large" color="inherit" variant="contained">
                  Annuler
                </Button>
                <LoadingButton loading={isSubmitting} variant="contained" type="submit" size="large" color="primary">
                  Enregistrer
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Card>
    </PageContainer>
  );
}
