import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, CircularProgress, Container, IconButton, Stack, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { FTextField } from '../../components/formik';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { getFormValidation } from './loginFormSchema';
import { dispatch } from '../../redux/store';
import useAuth from '../../hooks/useAuth';
import { loginAdmin } from '../../redux/thunks/loginThunk';

import ReCAPTCHA from 'react-google-recaptcha';

const STYLE_ICON = { color: 'primary.main', width: 20 };

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formik = useFormik<{ password: string; email: string; captchaToken: string }>({
    enableReinitialize: true,
    initialValues: { password: '', email: '', captchaToken: '' },
    validationSchema: getFormValidation(),
    onSubmit: async (values) => {
      const bodyFormData = {
        accountId: values?.email,
        password: values?.password,
        captchaToken: values?.captchaToken
      };
      const response: any = await dispatch(loginAdmin(bodyFormData));
      if (response && response?.payload?.data) {
        login(response?.payload?.data);
      }
    }
  });

  const { handleSubmit, setFieldValue } = formik;

  function onChange(value: any) {
    if (value) {
      setFieldValue('captchaToken', value);
    }
  }

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

              <ReCAPTCHA sitekey={KEY} onChange={onChange} />
            </Form>
          </FormikProvider>
        </Box>
      </Container>
    </Stack>
  );
}

const KEY = '6LdXSFwlAAAAAP_TRikzGX565Ne-yONIibgibWPv' as const;
