import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Stack, 
  Menu,
  MenuItem,
  ListItemIcon,
  Divider
} from '@mui/material';
import Sidebar from './Sidebar';
import ChatBot from '../ChatBot/ChatBot';
import Notifications from '../Notifications/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Settings, Logout, Person } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../contexts/CurrencyContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const { currency } = useCurrency();
  const drawerWidth = 280;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: darkMode ? 'rgba(18, 18, 18, 0.9)' : 'white',
          color: 'primary.main',
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: 'auto',
          p: 1
        }}
      >
        <Toolbar sx={{ 
          height: '100%', 
          minHeight: 70,
          px: 3,
          mx: 2,
          my: 0.5,
          borderRadius: 2
        }}>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexGrow: 1,
            gap: 2
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  fontFamily: "'Poppins', sans-serif",
                  color: 'primary.main',
                  lineHeight: 1.2,
                  fontSize: '1.8rem'
                }}
              >
                {t('welcome_back', { name: 'Yash' })}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  letterSpacing: '0.5px',
                  fontWeight: 500
                }}
              >
                {t('financial_overview_message')}
                <EmojiEventsIcon sx={{ fontSize: 20 }} />
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 3 }}>
              <Notifications />
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 2,
                borderLeft: '1px solid rgba(0,0,0,0.1)',
                pl: 2
              }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Yash Sawant
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('premium_user')}
                  </Typography>
                </Box>
                <IconButton 
                  onClick={handleClick}
                  sx={{ 
                    p: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 42, 
                      height: 42,
                      bgcolor: 'primary.main',
                      border: '2px solid rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    YS
                  </Avatar>
                </IconButton>
              </Box>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.9)' : 'background.default',
            borderRight: '1px solid',
            borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'divider',
            boxShadow: '2px 0 4px rgba(0,0,0,0.05)',
          },
        }}
      >
        <Box sx={{ height: 64 }} />
        <Sidebar />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 8,
          position: 'relative',
          backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.9)' : 'background.default'
        }}
      >
        {children}
        <ChatBot />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            {t('profile')}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            {t('settings')}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t('logout')}
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Layout; 