import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, // Add more reducers here if needed
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
