import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';
import { useCurrencyFormatter } from '../hooks/useCurrencyFormatter';

interface StatCardProps {
  title: string;
  value: number;
  icon: 'balance' | 'income' | 'expense' | 'savings' | 'total_income' | 'total_expense';
  trend?: 'up' | 'down';
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, subtitle }) => {
  const formatCurrency = useCurrencyFormatter();

  const getIcon = () => {
    switch (icon) {
      case 'balance':
        return <AccountBalanceIcon />;
      case 'income':
      case 'total_income':
        return <MonetizationOnIcon />;
      case 'expense':
      case 'total_expense':
        return <PaymentsIcon />;
      case 'savings':
        return <SavingsIcon />;
      default:
        return <MonetizationOnIcon />;
    }
  };

  const getIconColor = () => {
    switch (icon) {
      case 'balance':
        return 'primary.main';
      case 'income':
      case 'total_income':
        return 'success.main';
      case 'expense':
      case 'total_expense':
        return 'error.main';
      case 'savings':
        return trend === 'up' ? 'success.main' : 'error.main';
      default:
        return 'primary.main';
    }
  };

  return (
    <Card sx={{
      height: '100%',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
      boxShadow: '0 8px 32px rgba(77, 101, 217, 0.1)',
      borderRadius: 3,
      border: '1px solid rgba(255, 255, 255, 0.8)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      }
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Box sx={{ color: getIconColor() }}>
            {getIcon()}
          </Box>
        </Box>
        
        <Typography variant="h4" sx={{ mb: 1 }}>
          {formatCurrency(value)}
        </Typography>
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trend === 'up' ? (
              <TrendingUpIcon sx={{ color: 'success.main' }} />
            ) : (
              <TrendingDownIcon sx={{ color: 'error.main' }} />
            )}
            <Typography 
              variant="body2" 
              color={trend === 'up' ? 'success.main' : 'error.main'}
            >
              {trend === 'up' ? 'Increasing' : 'Decreasing'}
            </Typography>
          </Box>
        )}

        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard; 