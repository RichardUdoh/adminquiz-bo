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
  createSponsorAdmin,
  filesSponsorsLogo,
  getSponsor,
  updateSponsorAdmin,
  // updateSponsorAdmin
} from '../../../redux/thunks/sponsorThunk';
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

export default function CreateNewEditSponsorPage() {
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
    const fetchSponsor = async () => {
      if (id) {
        const response = await dispatch(getSponsor(id));
        const sponsor = response?.payload?.data;

        if (sponsor) {
          setInitialValues({
            label: sponsor.label || '',
            image: null,
            description: sponsor.description || '',
            startDate: sponsor.startDate?.slice(0, 10) || '',
            endDate: sponsor.endDate?.slice(0, 10) || '',
            redirectionLink: sponsor.redirectionLink || ''
          });

          setFileName(sponsor.image?.split('/').pop() || null);
        }
      }
    };

    fetchSponsor();
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
          const response: any = await dispatch(filesSponsorsLogo(formDataFile));
          if (response?.payload?.data?.url) {
            values.image = response.payload.data.url;
          }
        }

        if (id) {
          await dispatch(updateSponsorAdmin({ id, dataForm: values }));
        } else {
          await dispatch(createSponsorAdmin(values));
        }

        router.push(PATH_DASHBOARD.sponsors);
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
    <PageContainer menu={id ? "Modifier un sponsor" : "Ajouter un sponsor"}>
      <Card sx={{ p: 2 }}>
        <Box sx={{ margin: 'auto', width: { xs: '100%', md: '64%' }, pt: 2 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <FTextField name="label" label="Libellé" placeholder="libellé" />

              <Box
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }}
              >
                <FTextField name="startDate" type="date" label="Date début" />
                <FTextField name="endDate" type="date" label="Date fin" />

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

                <FTextField
                  name="redirectionLink"
                  label="Lien de redirection"
                  placeholder="https://"
                />
              </Box>

              <FTextField name="description" multiline rows={6} label="Description" />

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
