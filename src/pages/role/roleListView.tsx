import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { roleApi } from '../../store/role/roleApi';
import AlertDialog from '../../components/common/alertDialog';

interface Role {
  id: number;
  name: string;
}

const RoleListView: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRoles, setTotalRoles] = useState(0);
  const [page, setPage] = useState(0); // DataGrid uses 0-based indexing for pages
  const [pageSize, setPageSize] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchRoles(page + 1, pageSize);
  }, [page, pageSize]);

  const fetchRoles = (page: number, pageSize: number) => {
    setLoading(true);
    roleApi
      .getRoles({ page, page_size: pageSize })
      .then((response) => {
        setRoles(response.data.results);
        setTotalRoles(response.data.count);
      })
      .catch((error) => {
        console.error('Failed to fetch roles:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    setRoleToDelete(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (roleToDelete !== null) {
      roleApi
        .deleteRole(roleToDelete)
        .then(() => {
          console.log('Role deleted successfully');
          fetchRoles(page + 1, pageSize);
        })
        .catch((error) => {
          console.error('Failed to delete role:', error);
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
    { field: 'name', headerName: 'Name Role', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150, // Fixed width for actions column
      getActions: (params) => [
        <Link to={`/roles/edit/${params.row.id}`} key={params.row.id}>
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
            to="/roles/add"
            sx={{ marginBottom: 2 }}
        >
            Add Role
        </Button>
        <DataGrid
            rows={roles}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            pagination
            paginationMode="server"
            rowCount={totalRoles}
            pageSizeOptions={[5, 10]}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
            checkboxSelection
            sx={{ width: '100%', border: 0 }}  // Ensure full width of DataGrid
        />
        <AlertDialog
            open={openDialog}
            title="Confirm Deletion"
            description="Are you sure you want to delete this role? This action cannot be undone."
            onClose={cancelDelete}
            onConfirm={confirmDelete}
            confirmButtonText="Delete"
            cancelButtonText="Cancel"
            confirmButtonColor="error"
        />
    </Paper>
  );
};

export default RoleListView;
