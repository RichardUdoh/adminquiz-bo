import React, { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import {
  Button, Card, MenuItem, Select, FormControl, InputLabel,
  Box, Stack, Typography, Avatar,
  IconButton
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { FTextField } from '../../../components/formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import {
  createUserAdmin,
  filesUsersLogo,
  getUser,
  updateUserAdmin
} from '../../../redux/thunks/userThunk';
import { dispatch } from '../../../redux/store';
import { useRouter } from '../../../hooks/use-router';
import { PATH_DASHBOARD } from '../../../router/paths';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useParams } from 'react-router-dom';
import { getRolePermissions } from '../../../redux/thunks/rolePermissionThunk';
import { PhotoCamera, Visibility, VisibilityOff } from '@mui/icons-material';
const STYLE_ICON = { color: 'primary.main', width: 20 };

const getFormSchema = (id?: string) => Yup.object().shape({
  firstName: Yup.string().required('Champ requis'),
  lastName: Yup.string().required('Champ requis'),
  phoneNumber: Yup.string().required('Champ requis'),
  email: Yup.string().required('Champ requis'),
  role: Yup.string().required('Le rôle est obligatoire'),
  profilePictureUrl: Yup.mixed().required("L’image est obligatoire"),
  password: Yup.string().test(
    'password-validation',
    'Le mot de passe est requis',
    function (value) {
      if (!id && !value) {
        return this.createError({ message: 'Le mot de passe est requis' });
      }
      if (value && value.length < 6) {
        return this.createError({ message: 'Le mot de passe doit avoir au moins 6 caractères' });
      }
      return true;
    }
  ),
});


export default function CreateNewEditUserPage() {
  const router = useRouter();
  const { id } = useParams();
  const [roles, setRoles] = useState([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    role: '',
    profilePictureUrl: null,
    password: ''
  });

  // Récupérer les rôles
  useEffect(() => {
    const fetchRoles = async () => {
      const response = await dispatch(getRolePermissions('ACTIVE'));
      console.log('response', response);
      setRoles(response.payload.data);
    };
    fetchRoles();
  }, []);

  // Récupérer l'utilisateur à éditer
  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const response = await dispatch(getUser(id));
        const user = response.payload.data;
        setInitialValues({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          phoneNumber: user.phoneNumber || '',
          email: user.email || '',
          role: user.role?.id || '',
          profilePictureUrl: user.profilePictureUrl || null,
          password: '' 
        });
        setPreview(user.profilePictureUrl || null);
      }
    };
    fetchUser();
  }, [id]);

  // Formik Setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: getFormSchema(id),
    onSubmit: async (values) => {
      try {
        if (values.profilePictureUrl && typeof values.profilePictureUrl !== 'string') {
          const formData = new FormData();
          formData.append('file', values.profilePictureUrl);
          const response = await dispatch(filesUsersLogo(formData));
          values.profilePictureUrl = response?.payload?.data?.url;
        }

        if (id) {
          await dispatch(updateUserAdmin({ id, dataForm: values }));
        } else {
          await dispatch(createUserAdmin(values));
        }

        router.push(PATH_DASHBOARD.users);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire', error);
      }
    }
  });

  const { handleSubmit, setFieldValue, values, errors, touched, isSubmitting } = formik;

  // Gestion de l'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue('profilePictureUrl', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <PageContainer menu={id ? "Modifier un utilisateur" : "Ajouter un utilisateur"}>
      <Card sx={{ p: 2 }}>
        <Box sx={{ margin: 'auto', width: { xs: '100%', md: '64%' }, pt: 2 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Stack spacing={1} my={1.5}>
                <Typography m={0.5} variant="body2">Image</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <label htmlFor="image-upload">
                    <Avatar
                      src={preview || ''}
                      alt="Upload"
                      sx={{
                        width: 120,
                        height: 120,
                        backgroundColor: '#ffebc4',
                        cursor: 'pointer',
                        transition: '0.3s',
                      }}
                    >
                      {!preview && <PhotoCamera fontSize="large" sx={{
                        color: '#FEB31C',
                      }} />}
                    </Avatar>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </Box>

                {touched.profilePictureUrl && errors.profilePictureUrl && (
                  <Typography color="error" variant="caption">
                    {errors.profilePictureUrl}
                  </Typography>
                )}
              </Stack>

              <Box
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }}
              >
                <FTextField name="firstName" label="Nom" placeholder="Nom" />
                <FTextField name="lastName" label="Prénoms" placeholder="Prénoms" />
                <FTextField name="phoneNumber" label="Contact" placeholder="Contact" />
                <FTextField name="email" label="Email" placeholder="Email" />

                <Box mt={0} pt={0}>
                  <Typography variant="body2" >
                    Rôle
                  </Typography>
                  <FormControl fullWidth margin="dense">
                    <Select
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Sélectionner un rôle
                      </MenuItem>
                      {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.role && formik.errors.role && (
                    <Typography variant="caption" color="error">
                      {formik.errors.role}
                    </Typography>
                  )}
                </Box>
              <FTextField
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Mot de passe"
                placeholder="............"
                icon={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ ...STYLE_ICON }} />
                    ) : (
                      <Visibility sx={{ ...STYLE_ICON }} />
                    )}
                  </IconButton>
                }
              />
              </Box>

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
