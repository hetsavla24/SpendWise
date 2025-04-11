import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  useTheme,
  LinearProgress,
  Avatar,
  Stack,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Define TypeScript interfaces
interface DashboardData {
  summary: {
    total_transactions: number;
    total_credit: number;
    total_debit: number;
    current_balance: number;
  };
  monthly_analysis: Array<{
    month: string;
    total_credit: number;
    total_debit: number;
  }>;
  category_analysis: Array<{
    Transaction_Category: string;
    Debit: number;
  }>;
  recent_transactions: Array<{
    transaction_id: string;
    transaction_date: string;
    recipient_name: string;
    debit: number;
    credit: number;
  }>;
  savings_goal: {
    current: number;
    target: number;
    progress: number;
  };
}

const Dashboard = () => {
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/dashboard/analytics/');
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !dashboardData) {
    return <Box sx={{ p: 3 }}><LinearProgress /></Box>;
  }

  // Calculate percentage changes
  const calculatePercentageChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  // Format currency for Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Profile menu handlers
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  // Colors for category pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box sx={{ p: 2, height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Financial Summary Cards */}
      <Grid container spacing={3}>
        {/* Total Balance */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            height: '100%',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: 3,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Total Balance
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {formatCurrency(dashboardData.summary.current_balance)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ 
                  color: '#4ADE80',
                  bgcolor: 'rgba(74, 222, 128, 0.1)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}>
                  +{calculatePercentageChange(
                    dashboardData.summary.current_balance,
                    dashboardData.summary.current_balance - dashboardData.summary.total_credit + dashboardData.summary.total_debit
                  )}%
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Monthly Income */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            height: '100%',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: 3,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Monthly Income
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {formatCurrency(dashboardData.summary.total_credit)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ 
                  color: '#4ADE80',
                  bgcolor: 'rgba(74, 222, 128, 0.1)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}>
                  +5.3%
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Monthly Expenses */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            height: '100%',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: 3,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Monthly Expenses
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {formatCurrency(dashboardData.summary.total_debit)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ 
                  color: '#F75555',
                  bgcolor: 'rgba(247, 85, 85, 0.1)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}>
                  +7.5%
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Net Savings */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            height: '100%',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            borderRadius: 3,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Net Savings
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {formatCurrency(dashboardData.summary.total_credit - dashboardData.summary.total_debit)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ 
                  color: '#4ADE80',
                  bgcolor: 'rgba(74, 222, 128, 0.1)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}>
                  +2.0%
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', gap: 2, flex: 1, overflow: 'hidden' }}>
        {/* Left Side - Charts */}
        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Income vs Expenses Chart */}
          <Card sx={{ flex: 3 }}>
            <CardContent sx={{ height: '100%', p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">Income vs Expenses</Typography>
              </Box>
              <Box sx={{ height: 'calc(100% - 40px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.monthly_analysis}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="total_credit" 
                      name="Income"
                      stroke={theme.palette.primary.main} 
                      fillOpacity={1} 
                      fill="url(#colorIncome)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total_debit" 
                      name="Expenses"
                      stroke={theme.palette.error.main} 
                      fillOpacity={1} 
                      fill="url(#colorExpenses)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Category Analysis */}
          <Card sx={{ flex: 2 }}>
            <CardContent sx={{ height: '100%', p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Spending by Category
              </Typography>
              <Box sx={{ height: 'calc(100% - 40px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.category_analysis}
                      dataKey="Debit"
                      nameKey="Transaction_Category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {dashboardData.category_analysis.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Side - Transactions and Goals */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Recent Transactions */}
          <Card sx={{ flex: 3 }}>
            <CardContent sx={{ height: '100%', p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">Recent Transactions</Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1,
                height: 'calc(100% - 40px)',
                overflow: 'auto'
              }}>
                {dashboardData.recent_transactions.map((transaction, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 1,
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: transaction.debit > 0 ? 'error.light' : 'success.light',
                        color: transaction.debit > 0 ? 'error.dark' : 'success.dark',
                      }}
                    >
                      {transaction.debit > 0 ? '🛒' : '💰'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">{transaction.recipient_name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(transaction.transaction_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: transaction.debit > 0 ? 'error.main' : 'success.main',
                        fontWeight: 'bold'
                      }}
                    >
                      {transaction.debit > 0 ? '-' : '+'}{formatCurrency(transaction.debit || transaction.credit)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Savings Goal */}
          <Card sx={{ flex: 2 }}>
            <CardContent sx={{ height: '100%', p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">Savings Goal</Typography>
              </Box>
              <Box sx={{ height: 'calc(100% - 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary">Progress</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dashboardData.savings_goal.progress.toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={dashboardData.savings_goal.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Current</Typography>
                    <Typography variant="h6">{formatCurrency(dashboardData.savings_goal.current)}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Target</Typography>
                    <Typography variant="h6">{formatCurrency(dashboardData.savings_goal.target)}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 