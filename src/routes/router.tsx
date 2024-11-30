import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';
import DashboardPage from '../pages/dashboard/dashboardPage';
import ProtectedRoute from './protectedRoute';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
