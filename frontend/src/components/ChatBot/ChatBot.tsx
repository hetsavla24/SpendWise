import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const VoiceAssistant = () => {
  const [open, setOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: 'Hi! YASH I\'m your SpendWise voice assistant. Click the microphone to start talking!' },
  ]);

  // Poll for voice assistant status when listening
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isListening) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch('/api/dashboard/voice/status/');
          const data = await response.json();
          
          if (!data.is_active) {
            // Voice assistant stopped, get the final response
            await handleStopListening();
          }
        } catch (error) {
          console.error('Error checking voice status:', error);
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isListening]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (isListening) {
      handleStopListening();
    }
    setOpen(false);
  };

  const handleStartListening = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/dashboard/voice/start/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to start voice assistant');
      }

      setIsListening(true);
      setChatHistory(prev => [...prev, { type: 'bot', text: 'Listening... Speak now! 🎧' }]);
    } catch (error) {
      setError('Failed to start voice assistant. Please try again.');
      console.error('Error starting voice assistant:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopListening = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/dashboard/voice/stop/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to stop voice assistant');
      }

      const data = await response.json();
      setIsListening(false);

      // Add transcription to chat history if available
      if (data.transcription) {
        setChatHistory(prev => [...prev, { type: 'user', text: data.transcription }]);
      }

      // Add assistant response to chat history if available
      if (data.response) {
        setChatHistory(prev => [...prev, { type: 'bot', text: data.response }]);
      } else {
        setChatHistory(prev => [...prev, { type: 'bot', text: 'Stopped listening.' }]);
      }
    } catch (error) {
      setError('Failed to stop voice assistant. Please try again.');
      console.error('Error stopping voice assistant:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: '50%',
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 3,
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        <ChatIcon />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh',
            maxHeight: 600,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
          },
        }}
      >
        <DialogTitle sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">SpendWise Voice Assistant</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
          <Box sx={{ flexGrow: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {chatHistory.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: chat.type === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '80%',
                    bgcolor: chat.type === 'user' ? 'primary.main' : 'grey.100',
                    color: chat.type === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                  }}
                >
                  <Typography>{chat.text}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
          <IconButton
            onClick={isListening ? handleStopListening : handleStartListening}
            color={isListening ? 'error' : 'primary'}
            disabled={isLoading}
            sx={{
              width: 56,
              height: 56,
              border: '2px solid',
              borderColor: isListening ? 'error.main' : 'primary.main',
              position: 'relative',
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : isListening ? (
              <MicOffIcon />
            ) : (
              <MicIcon />
            )}
          </IconButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default VoiceAssistant; 