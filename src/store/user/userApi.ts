import apiWrapper from '../apiWrapper';

interface User {
  id: number;
  username: string;
  email: string;
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
  [key: string]: any;
}

export const userApi = {
  getUsers: () => apiWrapper.get<User[]>('/users/'),
  getMe: () => apiWrapper.get<User>('/users/me/'),
  getUserById: (id: number) => apiWrapper.get<User>(`/users/${id}/`),
  createUser: (data: CreateUserRequest) => apiWrapper.post<User>('/users/', data),
  updateUser: (data: UpdateUserRequest) =>
    apiWrapper.put<User>(`/users/${data.id}/`, data),
  deleteUser: (id: number) => apiWrapper.delete<void>(`/users/${id}/`),
};
