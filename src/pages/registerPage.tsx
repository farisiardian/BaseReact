import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../store/auth/authApi';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.register({ email, password, username });
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
