import apiWrapper from '../apiWrapper';

interface User {
  id: number;
  username: string;
  email: string;
  role_detail: { id: number; name: string }[]; // Roles as an array of objects
  [key: string]: any; // To allow for additional user fields
}

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

interface UpdateUserRequest {
  id: number;
  username?: string;
  email?: string;
  password?: string; // Add password as optional for updates
  [key: string]: any;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const userApi = {
  getUsers: (params?: { page?: number; page_size?: number }) =>
    apiWrapper.get<PaginatedResponse<User>>('/users/', { params }),
  getMe: () => apiWrapper.get<User>('/users/me/'),
  assignRoleToUser: (userId: number, roleId: number) =>
    apiWrapper.post('/users/assign-role/', { user_id: userId, role_id: roleId }),
  getUserById: (id: number) => apiWrapper.get<User>(`/users/${id}/`),
  createUser: (data: CreateUserRequest) => apiWrapper.post<User>('/users/', data),
  updateUser: (data: UpdateUserRequest) =>
    apiWrapper.put<User>(`/users/${data.id}/`, data),
  deleteUser: (id: number) => apiWrapper.delete<void>(`/users/${id}/`),
};

