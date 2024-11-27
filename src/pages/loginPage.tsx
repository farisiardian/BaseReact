import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth/authSlice';
import { authApi } from '../store/auth/authApi';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await authApi.login({ username, password });
      dispatch(login());
      localStorage.setItem('token_access', data.access);
      localStorage.setItem('token_refresh', data.refresh);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
