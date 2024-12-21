import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { roleApi } from '../../store/role/roleApi';

interface Role {
  id: number;
  name: string;
}

const PermissionListView: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRoles, setTotalRoles] = useState(0);
  const [page, setPage] = useState(0); // DataGrid uses 0-based indexing for pages
  const [pageSize, setPageSize] = useState(5);

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

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Role Name', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 150,
      getActions: (params) => [
        <Link to={`/permissions/edit/${params.row.id}`} key={`details-${params.row.id}`}>
          <GridActionsCellItem icon={<Edit />} label="Details" />
        </Link>,
      ],
    },
  ];

  return (
    <Paper sx={{ width: '100%', backgroundColor: 'transparent' }}>
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
    </Paper>
  );
};

export default PermissionListView;
