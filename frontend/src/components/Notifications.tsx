import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import { 
  NotificationsActive,
  Payment,
  AccountBalance,
  Warning
} from '@mui/icons-material';
import TranslatedText from './TranslatedText';

// Sample notifications data - in a real app, this would come from your backend
const notifications = [
  {
    id: 1,
    type: 'payment',
    title: 'Payment Due',
    message: 'Your credit card payment is due in 3 days',
    time: '2 hours ago',
    icon: <Payment color="primary" />
  },
  {
    id: 2,
    type: 'balance',
    title: 'Low Balance Alert',
    message: 'Your checking account balance is below ₹5,000',
    time: '5 hours ago',
    icon: <AccountBalance color="warning" />
  },
  {
    id: 3,
    type: 'alert',
    title: 'Unusual Activity',
    message: 'We detected unusual spending pattern',
    time: '1 day ago',
    icon: <Warning color="error" />
  }
];

const Notifications: React.FC = () => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notifications.length === 0 ? (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <NotificationsActive sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
          <Typography color="text.secondary">
            <TranslatedText text="No notifications yet" />
          </Typography>
        </Box>
      ) : (
        notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'background.default' }}>
                  {notification.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" color="text.primary">
                    <TranslatedText text={notification.title} />
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      <TranslatedText text={notification.message} />
                    </Typography>
                    <Typography
                      component="div"
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {notification.time}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))
      )}
    </List>
  );
};

export default Notifications; 