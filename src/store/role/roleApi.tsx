import apiWrapper from '../apiWrapper';

interface Role {
    id: number;
    name: string;
}

export const roleApi = {
    getRoles: () => apiWrapper.get<Role[]>('/roles/'),
    getRoleById: (id: number) => apiWrapper.get<Role>(`/roles/${id}/`),
    createRole: (data: Partial<Role>) => apiWrapper.post<Role>('/roles/', data),
    updateRole: (data: Partial<Role>) => apiWrapper.put<Role>(`/roles/${data.id}/`, data),
    deleteRole: (id: number) => apiWrapper.delete<void>(`/roles/${id}/`),
};
