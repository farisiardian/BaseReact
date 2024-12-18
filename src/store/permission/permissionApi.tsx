import apiWrapper from '../apiWrapper';

interface Permission {
    id: number;
    role: number;
    permission_name: string;
    description: string;
    is_permission: boolean;
}

interface PermissionHelper {
    id: number;
    key: string;
    name: string;
    description: string;
}

export const permissionApi = {
  getPermissions: (role?: number) => {
    const url = role ? `/permissions/?role=${role}` : '/permissions/';
    return apiWrapper.get<Permission[]>(url);
  },
  getPermissionById: (id: number) => apiWrapper.get<Permission>(`/permissions/${id}/`),
  getPermissionHelpers: () => apiWrapper.get<PermissionHelper[]>('/permission-helpers/'),
  updatePermission: (data: Partial<Permission>) => {
    if (!data.id) {
      throw new Error('Permission ID is required for updating.');
    }
    return apiWrapper.patch<Permission>(`/permissions/${data.id}/`, data);
  },
  updatePermissions: (data: Partial<Permission>[]) => {
    return apiWrapper.put('/permissions/batch-update/', data);  // Adjust the endpoint for batch updates
  },
};
