import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, CircularProgress, Container, IconButton, Stack, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import FTextField from '../../components/formik/FTextField';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { getFormValidation } from './loginFormSchema';

const STYLE_ICON = { color: 'primary.main', width: 20 };

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formik = useFormik<{ password: string; email: string }>({
    enableReinitialize: true,
    initialValues: { password: '', email: '' },
    validationSchema: getFormValidation(),
    onSubmit: async (values) => {
      // const bodyFormData = new FormData();

      // bodyFormData.set('email', values?.email);
      // bodyFormData.set('password', values?.password);
      // const response = await dispatch(postLogin(bodyFormData));
      // if (response && response?.payload?.user) {
      //   login(response?.payload?.user);
      // }
      console.log('values', values);
    }
  });

  const { handleSubmit } = formik;

  return (
    <Stack direction={`column`} justifyContent={`center`} sx={{ minHeight: 1 }}>
      <Container sx={{ width: 400 }}>
        <Box my={2}>
          <Box mb={4}>
            <Typography textAlign={`center`} variant="h4">
              Content de vous revoir
            </Typography>
            <Typography textAlign={`center`} variant="body2" color={`text.secondary`}>
              Lorem ipsum dolor sit amet, consetetur
            </Typography>
          </Box>

          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FTextField name="email" type="email" label="Email" placeholder="email.@gmail.com" />
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

              <Typography my={2} textAlign={`center`} color={`primary`} variant="body2">
                Mot de passe oublié ?
              </Typography>

              <LoadingButton
                fullWidth
                loadingIndicator={<CircularProgress sx={{ color: 'white' }} size={18} />}
                variant="contained"
                type="submit"
                // loading
                sx={{ my: 2 }}
                size="large"
                color="primary"
              >
                Connexion
              </LoadingButton>
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </Stack>
  );
}
