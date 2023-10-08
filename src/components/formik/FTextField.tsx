import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { useField } from 'formik';

type FTextFieldProps =
  | {
      label: string;
      placeholder: string;
      margin?: number | string;
      icon?: any;
      errorMess?: string;
    }
  | any;

export default function FTextField({
  label,
  placeholder,
  margin,
  icon,
  errorMess,
  ...other
}: FTextFieldProps) {
  const [field, meta] = useField(other);

  return (
    <Box my={margin ?? 1.5}>
      <Typography m={0.5} variant="body2">
        {label}
      </Typography>
      <TextField
        {...field}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          endAdornment: <InputAdornment position="end">{icon}</InputAdornment>
        }}
        error={Boolean(meta.touched && meta.error)}
        {...other}
      />
      <Typography variant="caption" color="error.dark" sx={{ my: 0.3 }}>
        {errorMess ? errorMess : meta.touched && meta.error}
      </Typography>
    </Box>
  );
}
