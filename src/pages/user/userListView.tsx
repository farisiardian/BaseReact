import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { userApi } from '../../store/user/userApi';
import AlertDialog from '../../components/common/alertDialog';

interface User {
  id: number;
  username: string;
  email: string;
}

const UserListView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 }, // Set width or use flex
    { field: 'username', headerName: 'Username', flex: 1 }, // Use flex for auto-width
    { field: 'email', headerName: 'Email', flex: 2 }, // More space for email column
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150, // Fixed width for actions column
      getActions: (params) => [
        <Link to={`/users/edit/${params.row.id}`} key={params.row.id}>
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
          />
        </Link>,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(params.row.id as number)}
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
            sx={{ width: '100%', border: 0 }}  // Ensure full width of DataGrid
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
    </Paper>
  );
};

export default UserListView;
