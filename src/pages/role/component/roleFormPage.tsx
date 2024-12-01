import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Box } from '@mui/material';
import { roleApi } from '../../../store/role/roleApi'; // Import the API

interface Role {
  id: number;
  name: string;
}

const RoleFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Get the role ID from the URL
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    if (id) {
      // Fetch role data for editing if an ID is provided
      roleApi
        .getRoleById(Number(id)) // Ensure id is passed as a number
        .then((response) => {
          setRole(response.data);
          setName(response.data.name);
        })
        .catch((error) => {
          console.error('Failed to fetch role:', error);
        });
    }
  }, [id]);

  const handleSave = () => {
    const newRole = {
      name
    };

    if (role) {
      // Update role, ensure password is sent if it's changed
      roleApi
        .updateRole({ id: role.id, ...newRole })
        .then(() => {
          navigate('/roles'); // Redirect to the roles list after saving
        })
        .catch((error) => {
          console.error('Failed to update role:', error);
        });
    } else {
      // Create new role
      roleApi
        .createRole(newRole)
        .then(() => {
          navigate('/roles'); // Redirect to the roles list after adding
        })
        .catch((error) => {
          console.error('Failed to add role:', error);
        });
    }
  };

  return (
    <Paper sx={{ width: '100%', padding: 3 }}>
      <Box sx={{ width: '100%', margin: '0 auto' }}>
        
        <Box sx={{ marginBottom: 2 }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: 8 }}>
            Role
          </label>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
            placeholder="Enter Role here"
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {role ? 'Save Changes' : 'Add Role'}
        </Button>
      </Box>
    </Paper>
  );
};

export default RoleFormPage;
