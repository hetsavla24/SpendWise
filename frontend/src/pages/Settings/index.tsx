import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  Button,
  Stack,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { getLanguageDisplayName } from '../../utils/formatters';

interface SettingsState {
  notifications: boolean;
  emailNotifications: boolean;
  budgetAlerts: boolean;
  weeklyReports: boolean;
  autoSync: boolean;
}

const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    emailNotifications: true,
    budgetAlerts: true,
    weeklyReports: true,
    autoSync: true,
  });

  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSettingChange = (setting: keyof SettingsState, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    setShowSaveSuccess(true);
  };

  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];
  const languages = ['en', 'es', 'fr', 'de', 'hi'];

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Header */}
      <Box
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t('settings')}
        </Typography>
        <Typography>
          {t('customize_experience')}
        </Typography>
      </Box>

      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'medium' }}>
              {t('appearance_language')}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">{t('darkMode')}</Typography>}
                  secondary={t('dark_mode_description')}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel id="language-label">{t('language')}</InputLabel>
                  <Select
                    labelId="language-label"
                    value={language}
                    label={t('language')}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang} value={lang}>
                        {getLanguageDisplayName(lang)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'medium' }}>
              {t('currency_regional')}
            </Typography>
            <List>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel id="currency-label">{t('currency')}</InputLabel>
                  <Select
                    labelId="currency-label"
                    value={currency}
                    label={t('currency')}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    {currencies.map((curr) => (
                      <MenuItem key={curr} value={curr}>
                        {curr}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'medium' }}>
              {t('notifications_alerts')}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">{t('push_notifications')}</Typography>}
                  secondary={t('push_notifications_description')}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">{t('email_notifications')}</Typography>}
                  secondary={t('email_notifications_description')}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">{t('budget_alerts')}</Typography>}
                  secondary={t('budget_alerts_description')}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.budgetAlerts}
                    onChange={(e) => handleSettingChange('budgetAlerts', e.target.checked)}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'medium' }}>
              {t('additional_features')}
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">{t('weekly_reports')}</Typography>}
                  secondary={t('weekly_reports_description')}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.weeklyReports}
                    onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">{t('auto_sync')}</Typography>}
                  secondary={t('auto_sync_description')}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.autoSync}
                    onChange={(e) => handleSettingChange('autoSync', e.target.checked)}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveSettings}
            size="large"
          >
            Save Changes
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={showSaveSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 