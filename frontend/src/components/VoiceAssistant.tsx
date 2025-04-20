import { useEffect, useState } from 'react';
import { Fab, styled } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
    transform: 'scale(1.1)',
    boxShadow: '0 8px 20px -6px rgba(142, 84, 233, 0.4)',
  },
}));

declare global {
  interface Window {
    vapiSDK: any;
    vapiInstance: any;
  }
}

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [script, setScript] = useState<HTMLScriptElement | null>(null);

  const cleanupVapi = () => {
    if (window.vapiInstance) {
      window.vapiInstance.destroy();
      window.vapiInstance = null;
    }
    if (script && document.body.contains(script)) {
      document.body.removeChild(script);
      setScript(null);
    }
  };

  useEffect(() => {
    return () => {
      cleanupVapi();
    };
  }, []);

  useEffect(() => {
    if (isOpen && import.meta.env.VITE_ENABLE_VOICE_ASSISTANT === 'true') {
      // Configuration for Vapi AI
      const assistant = import.meta.env.VITE_VAPI_ASSISTANT_ID;
      const apiKey = import.meta.env.VITE_VAPI_API_KEY;
      const buttonConfig = {};

      if (!assistant || !apiKey) {
        console.error('Voice assistant configuration is missing');
        return;
      }

      // Create and append the script
      const newScript = document.createElement('script');
      newScript.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
      newScript.defer = true;
      newScript.async = true;

      newScript.onload = () => {
        if (window.vapiSDK) {
          window.vapiInstance = window.vapiSDK.run({
            apiKey: apiKey,
            assistant: assistant,
            config: buttonConfig,
          });
        }
      };

      document.body.appendChild(newScript);
      setScript(newScript);
    } else {
      cleanupVapi();
    }
  }, [isOpen]);

  // Only render if voice assistant is enabled
  if (import.meta.env.VITE_ENABLE_VOICE_ASSISTANT !== 'true') {
    return null;
  }

  return (
    <StyledFab
      color="primary"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="voice assistant"
    >
      {isOpen ? <CloseIcon /> : <MicIcon />}
    </StyledFab>
  );
};

export default VoiceAssistant; 