import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { HomeRounded, Person2Outlined, SettingsRounded, KeyOutlined, LockOutlined } from '@mui/icons-material';

const mainListItems = [
  { text: 'Home', icon: <HomeRounded />, path: '/' },
];

const secondaryListItems = [
  { text: 'User', icon: <Person2Outlined />, path: '/users' },
  { text: 'Role', icon: <KeyOutlined />, path: '/roles' },
  { text: 'Permission', icon: <LockOutlined />, path: '/permissions' },
  { text: 'Settings', icon: <SettingsRounded />, path: '/' },
];

export default function MenuContent() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {/* Main List */}
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Secondary List */}
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
