import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Box } from '@mui/material';
import { userApi } from '../../../store/user/userApi'; // Import the API

interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Optional, for edit (password will not be required if updating)
}

const UserFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Get the user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add password state

  useEffect(() => {
    if (id) {
      // Fetch user data for editing if an ID is provided
      userApi
        .getUserById(Number(id)) // Ensure id is passed as a number
        .then((response) => {
          setUser(response.data);
          setUsername(response.data.username);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error('Failed to fetch user:', error);
        });
    }
  }, [id]);

  const handleSave = () => {
    const newUser = {
      username,
      email,
      password: password || '', // Include password, even if empty
    };

    if (user) {
      // Update user, ensure password is sent if it's changed
      userApi
        .updateUser({ id: user.id, ...newUser })
        .then(() => {
          navigate('/users'); // Redirect to the users list after saving
        })
        .catch((error) => {
          console.error('Failed to update user:', error);
        });
    } else {
      // Create new user
      userApi
        .createUser(newUser)
        .then(() => {
          navigate('/users'); // Redirect to the users list after adding
        })
        .catch((error) => {
          console.error('Failed to add user:', error);
        });
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {!user && (
          <TextField
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
            type="password"
          />
        )}
        <Button variant="contained" color="primary" onClick={handleSave}>
          {user ? 'Save Changes' : 'Add User'}
        </Button>
      </Box>
    </Paper>
  );
};

export default UserFormPage;
