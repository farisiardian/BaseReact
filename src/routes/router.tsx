import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';
import ProtectedRoute from './protectedRoute';
import BaseLayout from '../components/layout/baseLayout';

import DashboardPage from '../pages/dashboard/dashboardPage';
import UserListView from '../pages/user/userListView';
import UserFormPage from '../pages/user/component/userFormPage';
import RoleListView from '../pages/role/roleListView';
import RoleFormPage from '../pages/role/component/roleFormPage';
import PermissionListView from '../pages/permission/permissionListView';
import PermissionFormPage from '../pages/permission/component/permissionFormPage';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BaseLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UserListView />} />
        <Route path="users/add" element={<UserFormPage />} />
        <Route path="users/edit/:id" element={<UserFormPage />} />

        <Route path="roles" element={<RoleListView />} />
        <Route path="roles/add" element={<RoleFormPage />} />
        <Route path="roles/edit/:id" element={<RoleFormPage />} />

        <Route path="permissions" element={<PermissionListView />} />
        <Route path="permissions/edit/:id" element={<PermissionFormPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
