import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the admin dashboard. This is a placeholder page. Add your components here.
        </Typography>
      </Box>
    </Container>
  );
};

export default DashboardPage;
