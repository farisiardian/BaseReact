import apiWrapper from '../apiWrapper';

interface Permission {
    id: number;
    role: number;
    permission_name: string;
    description: string;
}

interface PermissionHelper {
    id: number;
    key: string;
    name: string;
    description: string;
}

export const permissionApi = {
    getPermissions: () => apiWrapper.get<Permission[]>('/permissions/'),
    getPermissionById: (id: number) => apiWrapper.get<Permission>(`/permissions/${id}/`),
    getPermissionHelpers: () => apiWrapper.get<PermissionHelper[]>('/permission-helpers/'),
    createPermission: (data: Partial<Permission>) => apiWrapper.post<Permission>('/permissions/', data),
    updatePermission: (data: Partial<Permission>) => apiWrapper.put<Permission>(`/permissions/${data.id}/`, data),
    deletePermission: (id: number) => apiWrapper.delete<void>(`/permissions/${id}/`),
};
