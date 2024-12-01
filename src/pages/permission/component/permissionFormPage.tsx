import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Box, Autocomplete, CircularProgress } from '@mui/material';
import { permissionApi } from '../../../store/permission/permissionApi'; // Import the API
import { roleApi } from '../../../store/role/roleApi'; // Import the API

interface Permission {
  id: number;
  role: number;
  permission_name: string;
  description: string;
}

interface Role {
  id: number;
  name: string;
}

interface PermissionHelper {
  id: number;
  key: string; // This is the value for permission_name
  name: string;
  description: string;
}

const PermissionFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Get the permission ID from the URL
  const navigate = useNavigate();
  const [permission, setPermission] = useState<Permission | null>(null);
  const [description, setDescription] = useState('');
  const [roles, setRoles] = useState<Role[]>([]); // State for roles
  const [permissionHelpers, setPermissionHelpers] = useState<PermissionHelper[]>([]); // State for permission helpers
  const [selectedRole, setSelectedRole] = useState<Role | null>(null); // Selected role
  const [selectedPermissionHelper, setSelectedPermissionHelper] = useState<PermissionHelper | null>(null); // Selected permission helper
  const [loadingRoles, setLoadingRoles] = useState(false); // Loading state for roles
  const [loadingPermissionHelpers, setLoadingPermissionHelpers] = useState(false); // Loading state for permission helpers

    useEffect(() => {
        // Fetch roles and permission helpers only on mount
        if (id) {
        permissionApi
            .getPermissionById(Number(id))
            .then((response) => {
            setPermission(response.data);
    
            // Find the role from the roles list based on the role id
            setSelectedRole(roles.find((role) => role.id === response.data.role) || null);
    
            // Find the corresponding PermissionHelper by key
            setSelectedPermissionHelper(
                permissionHelpers.find((helper) => helper.key === response.data.permission_name) || null
            );
    
            setDescription(response.data.description || '');
            })
            .catch((error) => {
            console.error('Failed to fetch permission:', error);
            });
        }
    
        // Fetch roles and permission helpers only once
        if (roles.length === 0) {
            fetchRoles();
        }
        if (permissionHelpers.length === 0) {
            fetchPermissionHelpers();
        }
    }, [id, roles.length, permissionHelpers.length]);

  const fetchRoles = () => {
    setLoadingRoles(true);
    roleApi
      .getRoles()
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch roles:', error);
      })
      .finally(() => {
        setLoadingRoles(false);
      });
  };

  const fetchPermissionHelpers = () => {
    setLoadingPermissionHelpers(true);
    permissionApi
      .getPermissionHelpers() // Replace this with the actual API call to get permission helpers
      .then((response) => {
        setPermissionHelpers(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch permission helpers:', error);
      })
      .finally(() => {
        setLoadingPermissionHelpers(false);
      });
  };

  const handleSave = () => {
    const newPermissionPayload = {
      role: selectedRole ? selectedRole.id : undefined,
      permission_name: selectedPermissionHelper ? selectedPermissionHelper.key : '', // Use the `key` for permission_name
      description: description,
    };

    if (permission) {
      // Update permission
      permissionApi
        .updatePermission({ id: permission.id, ...newPermissionPayload })
        .then(() => {
          navigate('/permissions'); // Redirect to the permissions list after saving
        })
        .catch((error) => {
          console.error('Failed to update permission:', error);
        });
    } else {
      // Create new permission
      permissionApi
        .createPermission(newPermissionPayload)
        .then(() => {
          navigate('/permissions'); // Redirect to the permissions list after adding
        })
        .catch((error) => {
          console.error('Failed to add permission:', error);
        });
    }
  };

  return (
    <Paper sx={{ width: '100%', padding: 3 }}>
      <Box sx={{ width: '100%', margin: '0 auto' }}>
        <Box sx={{ marginBottom: 2 }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: 8 }}>
                Permission
            </label>
            <Autocomplete
                value={selectedRole}
                onChange={(event, newValue) => setSelectedRole(newValue)}
                options={roles}
                getOptionLabel={(option) => option.name}
                loading={loadingRoles}
                renderInput={(params) => <TextField {...params} />}
                sx={{ marginBottom: 2 }}
            />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: 8 }}>
                Permission
            </label>
            <Autocomplete
                value={selectedPermissionHelper}
                onChange={(event, newValue) => setSelectedPermissionHelper(newValue)}
                options={permissionHelpers}
                getOptionLabel={(option) => option.name}
                loading={loadingPermissionHelpers}
                renderInput={(params) => <TextField {...params} />}
                sx={{ marginBottom: 2 }}
            />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: 8 }}>
                Description
            </label>
            <TextField
                id="description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description here"
            />
        </Box>

        
        <Button variant="contained" color="primary" onClick={handleSave}>
          {permission ? 'Save Changes' : 'Add Permission'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PermissionFormPage;
