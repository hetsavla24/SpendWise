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
import VoiceAssistant from '../VoiceAssistant';
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
          p: 1,
        }}
      >
        <Toolbar sx={{ 
          height: '100%', 
          minHeight: 70,
          px: 3,
          mx: 2,
          my: 0.5,
          borderRadius: 2,
        }}>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexGrow: 1,
            gap: 2,
            background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 8px 32px rgba(71, 118, 230, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
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
                  color: 'white',
                  lineHeight: 1.2,
                  fontSize: '1.8rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {t('welcome_back', { name: 'Yash' })}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  letterSpacing: '0.5px',
                  fontWeight: 500,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {t('financial_overview_message')}
                <EmojiEventsIcon sx={{ fontSize: 20, color: '#FFD700' }} />
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 3 }}>
              <Notifications />
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 2,
                borderLeft: '1px solid rgba(255,255,255,0.2)',
                pl: 2
              }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle2" sx={{ 
                    color: 'white',
                    fontWeight: 600,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}>
                    Yash Sawant
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.7rem',
                  }}>
                    {t('premium_user')}
                  </Typography>
                </Box>
                <IconButton 
                  onClick={handleClick}
                  sx={{ 
                    p: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 42, 
                      height: 42,
                      background: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      color: 'white',
                      fontWeight: 600,
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
          p: 3,
          pt: 10,
          width: `calc(100% - ${drawerWidth}px)`,
          minHeight: '100vh',
          backgroundColor: darkMode ? 'background.default' : 'grey.50',
        }}
      >
        <Toolbar />
        {children}
        <VoiceAssistant />
      </Box>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          {t('profile')}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AttachMoneyIcon fontSize="small" />
          </ListItemIcon>
          {t('currency')}: {currency}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('settings')}
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout; 