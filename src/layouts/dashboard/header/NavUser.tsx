import React from 'react';
import Iconify from '../../../components/Iconify';
import { Avatar, Stack, Typography } from '@mui/material';

export default function NavUser() {
  return (
    <Stack direction={`row`} justifyContent={`space-between`} alignItems={`center`} spacing={2}>
      <Iconify icon={'clarity:notification-solid-badged'} width={20} height={20} />
      <Stack
        direction={`row`}
        justifyContent={`space-between`}
        alignItems={`center`}
        spacing={1}
        sx={{ cursor: 'pointer' }}
      >
        <Avatar sx={{ width: 40, height: 40 }} />
        <Typography variant="subtitle2">kader</Typography>
      </Stack>
    </Stack>
  );
}
