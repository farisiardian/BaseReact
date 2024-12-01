import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

// Map route paths to user-friendly names
const routeNames: Record<string, string> = {
  '': 'Dashboard', // Root path is "Dashboard"
  users: 'Users',
  form: 'Form',
  login: 'Login',
  register: 'Register',
};

const NavbarBreadcrumbs = () => {
  const location = useLocation();

  // Split the current pathname into segments
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Handle specific cases where pathnames should merge
  const adjustedPathnames = [...pathnames];
  if (adjustedPathnames.includes('add') || adjustedPathnames.includes('edit')) {
    adjustedPathnames[adjustedPathnames.length - 1] = 'form'; // Replace 'add' or 'edit/:id' with 'form'
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* Dashboard is always the first breadcrumb */}
      <Link component={RouterLink} to="/" color="inherit" underline="hover">
        {routeNames['']}
      </Link>
      {/* Dynamic breadcrumbs */}
      {adjustedPathnames.map((value, index) => {
        const routeTo = `/${adjustedPathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === adjustedPathnames.length - 1;

        return isLast ? (
          <Typography color="text.primary" key={routeTo}>
            {routeNames[value] || value}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            to={routeTo}
            color="inherit"
            underline="hover"
            key={routeTo}
          >
            {routeNames[value] || value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default NavbarBreadcrumbs;
