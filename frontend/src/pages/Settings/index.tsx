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

interface SettingsState {
  darkMode: boolean;
  notifications: boolean;
  currency: string;
  language: string;
  emailNotifications: boolean;
  budgetAlerts: boolean;
  weeklyReports: boolean;
  autoSync: boolean;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    darkMode: false,
    notifications: true,
    currency: 'USD',
    language: 'English',
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
  const languages = ['English', 'Spanish', 'French', 'German', 'Hindi'];

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
          Settings
        </Typography>
        <Typography>
          Customize your SpendWise experience
        </Typography>
      </Box>

      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'medium' }}>
              Appearance & Language
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">Dark Mode</Typography>}
                  secondary="Enable dark theme for better visibility in low light"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.darkMode}
                    onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel id="language-label">Language</InputLabel>
                  <Select
                    labelId="language-label"
                    value={settings.language}
                    label="Language"
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang} value={lang}>
                        {lang}
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
              Currency & Regional
            </Typography>
            <List>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel id="currency-label">Currency</InputLabel>
                  <Select
                    labelId="currency-label"
                    value={settings.currency}
                    label="Currency"
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                  >
                    {currencies.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
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
              Notifications & Alerts
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">Push Notifications</Typography>}
                  secondary="Receive important updates and alerts"
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
                  primary={<Typography variant="subtitle1">Email Notifications</Typography>}
                  secondary="Get updates and reports via email"
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
                  primary={<Typography variant="subtitle1">Budget Alerts</Typography>}
                  secondary="Get notified when approaching budget limits"
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
              Additional Features
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={<Typography variant="subtitle1">Weekly Reports</Typography>}
                  secondary="Receive weekly spending analysis reports"
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
                  primary={<Typography variant="subtitle1">Auto Sync</Typography>}
                  secondary="Automatically sync data across devices"
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