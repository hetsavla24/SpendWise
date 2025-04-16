import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Avatar, styled, ButtonBase, Menu, MenuItem, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FlagIcon from '@mui/icons-material/Flag';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import { Person, Logout } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 240,
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  position: 'fixed',
  left: 0,
  top: 0,
  borderRight: `1px solid ${theme.palette.divider}`,
  boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  height: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '10%',
    right: '10%',
    height: '1px',
    background: 'rgba(255,255,255,0.2)',
  }
}));

const UserProfile = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  padding: '12px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  textAlign: 'left',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SidebarMenuItem = styled(ListItem)<{ active?: boolean }>(({ theme, active }) => ({
  padding: '12px 24px',
  cursor: 'pointer',
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  borderLeft: active ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
}));

const Sidebar = () => {
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    { 
      text: t('dashboard'), 
      icon: <DashboardIcon />, 
      path: '/',
      apiEndpoint: '/api/dashboard/summary'
    },
    { 
      text: t('transactions'), 
      icon: <AccountBalanceWalletIcon />, 
      path: '/transactions',
      apiEndpoint: '/api/transactions'
    },
    { 
      text: t('budget'), 
      icon: <AttachMoneyIcon />, 
      path: '/budget',
      apiEndpoint: '/api/budgets'
    },
    { 
      text: t('reports'), 
      icon: <AssessmentIcon />, 
      path: '/reports',
      apiEndpoint: '/api/reports'
    },
    { 
      text: t('goals'), 
      icon: <FlagIcon />, 
      path: '/goals',
      apiEndpoint: '/api/goals'
    },
    { 
      text: t('investments'), 
      icon: <ShowChartIcon />, 
      path: '/investments',
      apiEndpoint: '/api/investments'
    },
    { 
      text: t('calendar'), 
      icon: <CalendarTodayIcon />, 
      path: '/calendar',
      apiEndpoint: '/api/calendar'
    },
    { 
      text: t('settings'), 
      icon: <SettingsIcon />, 
      path: '/settings',
      apiEndpoint: '/api/settings'
    },
  ];

  return (
    <SidebarContainer sx={{ bgcolor: darkMode ? 'rgba(18, 18, 18, 0.9)' : 'background.paper' }}>
      <LogoContainer>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 800,
            letterSpacing: '0.5px',
            fontFamily: "'Poppins', sans-serif",
            color: '#fff',
            textAlign: 'center',
            mb: 0.5,
            fontSize: '1.8rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          SpendWise
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontSize: '0.65rem',
            fontWeight: 500
          }}
        >
          {t('financial_management')}
        </Typography>
      </LogoContainer>

      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.text}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'text.secondary', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                '& .MuiListItemText-primary': {
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }
              }}
            />
          </SidebarMenuItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar; 