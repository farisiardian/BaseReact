import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
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
  role_detail: { id: number; name: string }[]; // Roles as an array of objects
}

const UserListView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(0); // DataGrid uses 0-based indexing for pages
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  
  useEffect(() => {
    fetchUsers(page + 1, pageSize);
  }, [page, pageSize]);
  
  const fetchUsers = (page: number, pageSize: number) => {
    setLoading(true);
    userApi
      .getUsers({ page, page_size: pageSize })
      .then((response) => {
        setUsers(response.data.results);
        setTotalUsers(response.data.count);
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
          fetchUsers(page + 1, pageSize); // Refresh the current page
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
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'role_detail',
      headerName: 'Roles',
      flex: 2,
      renderCell: (params) => {
        const role = params.value as { id: number; name: string } | null;
        return role ? role.name : 'No roles';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: (params: GridRowParams<User>) => [
        <Link to={`/users/edit/${params.row.id}`} key={`edit-${params.row.id}`}>
          <GridActionsCellItem icon={<Edit />} label="Edit" />
        </Link>,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
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
        pagination
        paginationMode="server"
        rowCount={totalUsers}
        pageSizeOptions={[5, 10]}
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
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
    </Paper>
  );
};

export default UserListView;
