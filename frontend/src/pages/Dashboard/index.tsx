import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import AmountDisplay from '../../components/AmountDisplay';

interface StatCardProps {
  title: string;
  amount: number;
  change: string;
  isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, amount, change, isPositive }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <AmountDisplay
        amount={amount}
        variant="h4"
        gutterBottom
        colored={false}
      />
      <Typography
        variant="body2"
        sx={{ color: isPositive ? 'success.main' : 'error.main' }}
      >
        {change} from last month
      </Typography>
    </Paper>
  );
};

const Dashboard = () => {
  const theme = useTheme();

  // Mock data
  const dashboardData = {
    summary: {
      current_balance: 12500,
      total_credit: 5000,
      total_debit: 2500,
    }
  };

  return (
    <Box 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Box 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)'
            : 'linear-gradient(135deg, #1976d2 0%, #115293 100%)',
          color: 'white',
          mb: 2
        }}
      >
        <Typography variant="h5" fontWeight="600" color="inherit">
          Welcome back, Yash!
        </Typography>
        <Typography variant="body1" color="inherit" sx={{ opacity: 0.9 }}>
          Your financial overview is looking great this month! 🏆
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Balance"
            amount={dashboardData.summary.current_balance}
            change="+0%"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Income"
            amount={dashboardData.summary.total_credit}
            change="+5.3%"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Expenses"
            amount={-dashboardData.summary.total_debit}
            change="+7.5%"
            isPositive={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Net Savings"
            amount={dashboardData.summary.total_credit - dashboardData.summary.total_debit}
            change="+2.0%"
            isPositive={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 