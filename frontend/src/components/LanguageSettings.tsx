import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';
import TranslatedText from './TranslatedText';

const LanguageSettings: React.FC = () => {
  const theme = useTheme();
  const { currentLanguage, setLanguage, supportedLanguages } = useLanguage();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = supportedLanguages.find(lang => lang.code === event.target.value);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LanguageIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
          <TranslatedText
            text="Language Settings"
            variant="h6"
            component="h2"
          />
        </Box>
        <TranslatedText
          text="Choose your preferred language for the application interface"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 3 }}
        />
        <FormControl fullWidth>
          <InputLabel id="language-select-label">
            <TranslatedText text="Language" />
          </InputLabel>
          <Select
            labelId="language-select-label"
            value={currentLanguage.code}
            label={<TranslatedText text="Language" />}
            onChange={handleLanguageChange}
          >
            {supportedLanguages.map((language) => (
              <MenuItem key={language.code} value={language.code}>
                {language.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default LanguageSettings; 