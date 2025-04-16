import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import Goals from './pages/Goals';
import Investments from './pages/Investments';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import { ThemeProvider } from './contexts/ThemeContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Auth pages
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import ForgotPasswordPage from './pages/Auth/ForgotPassword';

const App: React.FC = () => {
  // This will be replaced with actual auth check from Django backend
  const isAuthenticated = true;

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <LanguageProvider>
          <CssBaseline />
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          </Router>
        </LanguageProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
};

export default App;
