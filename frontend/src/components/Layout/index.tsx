import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fab,
  useTheme,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 280;

// Logo component
const Logo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '& svg': {
    width: 32,
    height: 32,
  },
}));

// Main content wrapper
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: DRAWER_WIDTH,
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

// Chatbot Dialog Content
const ChatbotContent = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openChatbot, setOpenChatbot] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          ml: `${DRAWER_WIDTH}px`,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <Logo>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z"
                fill={theme.palette.primary.main}
              />
              <path
                d="M22 12h-4V8c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v4H6c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h4v4c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2v-4c0-1.103-.897-2-2-2z"
                fill="white"
              />
            </svg>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              SpendWise
            </Typography>
          </Logo>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            size="large"
            onClick={() => setOpenNotifications(true)}
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              cursor: 'pointer',
            }}
          >
            U
          </Avatar>
        </Toolbar>
      </AppBar>

      <Sidebar />

      <Main>
        <Toolbar /> {/* This adds spacing below the AppBar */}
        {children}
      </Main>

      {/* Notifications Dialog */}
      <Dialog
        open={openNotifications}
        onClose={() => setOpenNotifications(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Notifications
          <IconButton
            onClick={() => setOpenNotifications(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Add your notifications content here */}
          <Typography variant="body2" color="text.secondary">
            You have 3 new notifications
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Chatbot Button */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        onClick={() => setOpenChatbot(true)}
      >
        <ChatIcon />
      </Fab>

      {/* Chatbot Dialog */}
      <Dialog
        open={openChatbot}
        onClose={() => setOpenChatbot(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          SpendWise Assistant
          <IconButton
            onClick={() => setOpenChatbot(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ChatbotContent>
            {/* Add your chatbot content here */}
            <Typography variant="body2" color="text.secondary">
              Hi! I'm your SpendWise assistant. How can I help you today?
            </Typography>
          </ChatbotContent>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setOpenChatbot(false)}
          >
            Start Chat
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Layout; 