import React from 'react';
import PageContainer from '../../components/PageContainer';
import { TableComponent } from '../../components/table';
import { Button } from '@mui/material';

export default function UserPage() {
  return (
    <PageContainer
      menu="Utilisateurs"
      headerButton={
        <Button size="large" variant="contained">
          Ajouter
        </Button>
      }
    >
      <TableComponent />
    </PageContainer>
  );
}
