import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';
import ProtectedRoute from './protectedRoute';
import BaseLayout from '../components/layout/baseLayout';

import DashboardPage from '../pages/dashboard/dashboardPage';
import UserListView from '../pages/user/userListView';
import UserFormPage from '../pages/user/component/userFormPage';

const AppRouter = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Routes with Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BaseLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UserListView />} />
        <Route path="/users/add" element={<UserFormPage />} />
        <Route path="/users/edit/:id" element={<UserFormPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
