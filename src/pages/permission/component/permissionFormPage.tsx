import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel, Button, Box } from '@mui/material';
import { permissionApi } from '../../../store/permission/permissionApi';

interface Permission {
  id: number;
  permission_name: string;
  description: string;
  is_permission: boolean;
}

const PermissionFormPage: React.FC = () => {
  const { id: roleId } = useParams<{ id: string }>(); // Rename 'id' to 'roleId'
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRolePermissions();
  }, []);

  const fetchRolePermissions = () => {
    console.log(roleId); // This should now log the correct ID from the URL
    if (!roleId) {
      console.error('Role ID is undefined');
      return;
    }

    setLoading(true);
    permissionApi
      .getPermissions(Number(roleId)) // Convert string to number safely
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch role permissions:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePermissionToggle = (permissionId: number) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.id === permissionId
          ? { ...perm, is_permission: !perm.is_permission }
          : perm
      )
    );
  };

  const savePermissions = () => {
    // Prepare the array of updates
    const updates = permissions.map((perm) => ({
      id: perm.id,
      role: Number(roleId),
      permission_name: perm.permission_name,
      description: perm.description,
      is_permission: perm.is_permission,
    }));
  
    // Send the entire array in one API call
    permissionApi.updatePermissions(updates)
      .then(() => {
        navigate('/permissions');  // Navigate after successful update
      })
      .catch((error) => {
        console.error('Failed to update permissions:', error);
      });
  };
  

  return (
    <Box>
      <h2>Role Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}> {/* This makes the list vertical */}
          {permissions.map((permission) => (
            <FormControlLabel
              key={permission.id}
              control={
                <Checkbox
                  checked={permission.is_permission}
                  onChange={() => handlePermissionToggle(permission.id)}
                />
              }
              label={`${permission.permission_name} - ${permission.description}`}
              sx={{ marginBottom: 1 }}  // Adds space between checkboxes
            />
          ))}
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={savePermissions}
        disabled={loading}
        sx={{ marginTop: 2 }}  // Adds margin to the save button
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default PermissionFormPage;
