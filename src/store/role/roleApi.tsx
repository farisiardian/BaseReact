import apiWrapper from '../apiWrapper';

interface Role {
    id: number;
    name: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const roleApi = {
    getRoles: (params?: { page?: number; page_size?: number }) => apiWrapper.get<PaginatedResponse<Role>>('/roles/', { params }),
    getRoleById: (id: number) => apiWrapper.get<Role>(`/roles/${id}/`),
    createRole: (data: Partial<Role>) => apiWrapper.post<Role>('/roles/', data),
    updateRole: (data: Partial<Role>) => apiWrapper.put<Role>(`/roles/${data.id}/`, data),
    deleteRole: (id: number) => apiWrapper.delete<void>(`/roles/${id}/`),
};
