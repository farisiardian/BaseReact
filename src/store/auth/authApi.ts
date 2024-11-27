import apiWrapper from '../apiWrapper';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export const authApi = {
  login: (credentials: LoginRequest) => apiWrapper.post<LoginResponse>('/login/', credentials),
  register: (data: RegisterRequest) => apiWrapper.post('/register/', data),
};
