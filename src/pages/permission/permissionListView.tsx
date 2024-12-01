import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { permissionApi } from '../../store/permission/permissionApi';
import { roleApi } from '../../store/role/roleApi';
import AlertDialog from '../../components/common/alertDialog';

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

const PermissionListView: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  const fetchPermissions = () => {
    setLoading(true);
    permissionApi
      .getPermissions()
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch permissions:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchRoles = () => {
    roleApi
      .getRoles()
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch roles:', error);
      });
  };

  const handleDelete = (id: number) => {
    setPermissionToDelete(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (permissionToDelete !== null) {
      permissionApi
        .deletePermission(permissionToDelete)
        .then(() => {
          console.log('Permission deleted successfully');
          fetchPermissions();
        })
        .catch((error) => {
          console.error('Failed to delete permission:', error);
        })
        .finally(() => {
          setOpenDialog(false);
        });
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  // Map role ID to role name
  const mapRoleName = (roleId: number) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  };

  const columns: GridColDef[] = [
    { 
      field: 'role', 
      headerName: 'Role', 
      flex: 1,
      valueFormatter: (params) => mapRoleName(params),
    },
    { field: 'permission_name', headerName: 'Permission', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <Link to={`/permissions/edit/${params.row.id}`} key={params.row.id}>
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
            to="/permissions/add"
            sx={{ marginBottom: 2 }}
        >
            Add Permission
        </Button>
        <DataGrid
            rows={permissions}
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
            description="Are you sure you want to delete this permission? This action cannot be undone."
            onClose={cancelDelete}
            onConfirm={confirmDelete}
            confirmButtonText="Delete"
            cancelButtonText="Cancel"
            confirmButtonColor="error"
        />
    </Paper>
  );
};

export default PermissionListView;
