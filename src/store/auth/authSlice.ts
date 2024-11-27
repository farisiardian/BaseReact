import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import auth from '../../utils/auth';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: auth.isAuthenticated(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      auth.clearToken();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
