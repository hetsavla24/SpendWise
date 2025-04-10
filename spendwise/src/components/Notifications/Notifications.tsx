import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const notifications = [
  {
    id: 1,
    title: 'Monthly Budget Alert',
    message: 'You\'ve reached 80% of your monthly budget',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Bill Payment Reminder',
    message: 'Electricity bill payment is due in 3 days',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Savings Goal Update',
    message: 'You\'re halfway to your savings goal!',
    time: '1 day ago',
    unread: false,
  },
];

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [unreadCount, setUnreadCount] = useState(2);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUnreadCount(0); // Mark all as read when opening notifications
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={handleClose}
            sx={{
              py: 1.5,
              px: 2,
              borderLeft: (theme) =>
                notification.unread
                  ? `4px solid ${theme.palette.primary.main}`
                  : '4px solid transparent',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {notification.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        {notifications.length === 0 && (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Notifications; 