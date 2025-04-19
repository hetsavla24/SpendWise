import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Popover,
  Typography,
  Box,
  List,
  Card,
  Button,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SavingsIcon from '@mui/icons-material/Savings';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const notifications = [
  {
    id: 1,
    type: 'savings',
    title: 'Savings Opportunity',
    message: 'You could save $200 by reducing dining expenses',
    icon: <SavingsIcon sx={{ fontSize: 32 }} />,
    color: '#4CAF50',
    bgColor: 'linear-gradient(135deg, #43A047 0%, #66BB6A 100%)',
    lightBgColor: 'rgba(76, 175, 80, 0.1)',
    action: 'View Savings Plan',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'alert',
    title: 'Bill Payment Due',
    message: 'Electricity bill ($150) due in 3 days',
    icon: <WarningIcon sx={{ fontSize: 32 }} />,
    color: '#FF9800',
    bgColor: 'linear-gradient(135deg, #FF9800 0%, #FFA726 100%)',
    lightBgColor: 'rgba(255, 152, 0, 0.1)',
    action: 'Pay Now',
    time: '5 hours ago',
  },
  {
    id: 3,
    type: 'investment',
    title: 'Investment Tip',
    message: 'Market conditions favorable for tech stocks',
    icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
    color: '#2196F3',
    bgColor: 'linear-gradient(135deg, #1E88E5 0%, #42A5F5 100%)',
    lightBgColor: 'rgba(33, 150, 243, 0.1)',
    action: 'View Analysis',
    time: '1 day ago',
  },
  {
    id: 4,
    type: 'budget',
    title: 'Budget Alert',
    message: 'Entertainment budget exceeded by 40%',
    icon: <AccountBalanceIcon sx={{ fontSize: 32 }} />,
    color: '#F44336',
    bgColor: 'linear-gradient(135deg, #E53935 0%, #EF5350 100%)',
    lightBgColor: 'rgba(244, 67, 54, 0.1)',
    action: 'Adjust Budget',
    time: '1 day ago',
  },
  {
    id: 5,
    type: 'cashback',
    title: 'Cashback Available',
    message: 'Claim $30 cashback from recent purchases',
    icon: <LocalAtmIcon sx={{ fontSize: 32 }} />,
    color: '#9C27B0',
    bgColor: 'linear-gradient(135deg, #8E24AA 0%, #AB47BC 100%)',
    lightBgColor: 'rgba(156, 39, 176, 0.1)',
    action: 'Claim Now',
    time: '2 days ago',
  },
  {
    id: 6,
    type: 'shopping',
    title: 'Smart Shopping',
    message: 'Better deals available for your subscriptions',
    icon: <ShoppingCartIcon sx={{ fontSize: 32 }} />,
    color: '#00BCD4',
    bgColor: 'linear-gradient(135deg, #00ACC1 0%, #26C6DA 100%)',
    lightBgColor: 'rgba(0, 188, 212, 0.1)',
    action: 'Compare Deals',
    time: '2 days ago',
  }
];

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUnreadCount(0); // Mark all as read when opening notifications
  };

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    console.log('Action clicked:', action);
    // Add your action handler here
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #3665d5 0%, #7d43d8 100%)',
          },
          width: 40,
          height: 40,
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsActiveIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          zIndex: 1400,
        }}
        PaperProps={{
          sx: {
            mt: 1,
            width: 400,
            maxHeight: '80vh',
            overflowY: 'auto',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(77, 101, 217, 0.1)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }
        }}
      >
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
          bgcolor: 'white',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Smart Insights
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {unreadCount} new
          </Typography>
        </Box>

        <List sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              sx={{
                background: notification.bgColor,
                color: 'white',
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                opacity: 0.2,
                transform: 'rotate(-15deg)',
              }}>
                {React.cloneElement(notification.icon, { sx: { fontSize: 100 } })}
              </Box>
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {notification.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {notification.time}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  {notification.message}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => handleActionClick(e, notification.action)}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    },
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  {notification.action}
                </Button>
              </Box>
            </Card>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default Notifications; 