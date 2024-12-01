import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Autocomplete } from '@mui/material';
import { roleApi } from '../../../store/role/roleApi'; // Import roleApi to fetch roles
import { userApi } from '../../../store/user/userApi';

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  userId: number | null; // User id for role assignment
}

const AssignFormDialog: React.FC<FormDialogProps> = ({ open, onClose, userId }) => {
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null); // Selected role id

  useEffect(() => {
    // Fetch roles when the dialog is opened
    roleApi.getRoles().then((response) => {
      setRoles(response.data);
    }).catch((error) => {
      console.error('Failed to fetch roles:', error);
    });
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId && selectedRole !== null) {
      // Send user_id and role_id to your API for role assignment
      userApi
        .assignRoleToUser(userId, selectedRole)
        .then(() => {
          console.log('Role assigned successfully');
          onClose();
        })
        .catch((error) => {
          console.error('Failed to assign role:', error);
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assign Role</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            options={roles}
            getOptionLabel={(option) => option.name} // Adjust to match your role data structure
            onChange={(event, newValue) => setSelectedRole(newValue?.id || null)}
            renderInput={(params) => <TextField {...params} label="Select Role" fullWidth />}
            value={roles.find((role) => role.id === selectedRole) || null}
            disableClearable
          />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Assign Role
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignFormDialog;
