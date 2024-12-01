import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Edit, Delete, Add, Person } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { userApi } from '../../store/user/userApi';
import AlertDialog from '../../components/common/alertDialog';
import AssignFormDialog from './component/assignFormDialog';

interface User {
  id: number;
  username: string;
  email: string;
  roles: { id: number; name: string }[]; // Roles as an array of objects
}

const UserListView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [openAssignRoleDialog, setOpenAssignRoleDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    userApi
      .getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    setUserToDelete(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (userToDelete !== null) {
      userApi
        .deleteUser(userToDelete)
        .then(() => {
          console.log('User deleted successfully');
          fetchUsers();
        })
        .catch((error) => {
          console.error('Failed to delete user:', error);
        })
        .finally(() => {
          setOpenDialog(false);
        });
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  const handleAssignRole = (userId: number) => {
    setSelectedUserId(userId);
    setOpenAssignRoleDialog(true);
  };

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'roles',
      headerName: 'Roles',
      flex: 2,
      renderCell: (params) => {
        const roles = params.value as { id: number; name: string }[];
        return roles.length > 0 ? roles.map((role) => role.name).join(', ') : 'No roles';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <Link to={`/users/edit/${params.row.id}`} key={params.row.id}>
          <GridActionsCellItem icon={<Edit />} label="Edit" />
        </Link>,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(params.row.id as number)}
        />,
        <GridActionsCellItem
          icon={<Person />}
          label="Assign Role"
          onClick={() => handleAssignRole(params.row.id as number)}
        />,
      ],
    },
  ];

  return (
    <Paper sx={{ width: '100%', backgroundColor: 'transparent' }}>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to="/users/add"
        sx={{ marginBottom: 2 }}
      >
        Add User
      </Button>
      <DataGrid
        rows={users}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ width: '100%', border: 0 }}
      />
      <AlertDialog
        open={openDialog}
        title="Confirm Deletion"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        confirmButtonColor="error"
      />
      {/* Role Assignment Dialog */}
      <AssignFormDialog
        open={openAssignRoleDialog}
        onClose={() => setOpenAssignRoleDialog(false)}
        userId={selectedUserId}
      />
    </Paper>
  );
};

export default UserListView;
