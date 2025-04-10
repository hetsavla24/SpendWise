import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  useTheme,
  LinearProgress,
  Button,
  Avatar,
  IconButton,
  Stack,
  Grid,
  experimentalStyled as styled
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Dashboard = () => {
  const theme = useTheme();

  useEffect(() => {
    console.log('Dashboard component mounted');
  }, []);

  // Mock data
  const monthlyData = [
    { month: 'Jan', income: 5000, expenses: 3500 },
    { month: 'Feb', income: 5200, expenses: 3800 },
    { month: 'Mar', income: 4800, expenses: 3300 },
    { month: 'Apr', income: 6000, expenses: 4200 },
    { month: 'May', income: 5500, expenses: 3900 },
    { month: 'Jun', income: 5800, expenses: 4100 },
  ];

  const categoryData = [
    { name: 'Food', value: 1200, color: '#FF6B6B' },
    { name: 'Transport', value: 800, color: '#4ECDC4' },
    { name: 'Shopping', value: 1500, color: '#45B7D1' },
    { name: 'Bills', value: 2000, color: '#96CEB4' },
  ];

  const recentTransactions = [
    { id: 1, name: 'Grocery Store', amount: -84.53, date: 'Today', category: 'Food' },
    { id: 2, name: 'Salary Deposit', amount: 3500.00, date: 'Yesterday', category: 'Income' },
    { id: 3, name: 'Electric Bill', amount: -142.87, date: '2 days ago', category: 'Bills' },
    { id: 4, name: 'Restaurant', amount: -56.20, date: '3 days ago', category: 'Food' },
  ];

  // Financial data
  const totalBalance = 42892.50;
  const percentageChange = 12.5;
  const monthlyIncome = 8267.00;
  const incomePercentage = 5.2;
  const monthlyExpenses = 3512.75;
  const expensePercentage = 8.7;
  const netSavings = 4754.25;
  const savingsPercentage = 2.3;

  try {
    return (
      <Box sx={{ p: 2, height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflow: 'hidden' }}>
          {/* Financial Summary Cards */}
          <Grid container spacing={3}>
            {/* Total Balance */}
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  borderRadius: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
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
                    ₹{(totalBalance * 83).toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: percentageChange >= 0 ? '#4ADE80' : '#F75555',
                        bgcolor: percentageChange >= 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(247, 85, 85, 0.1)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {percentageChange >= 0 ? '+' : ''}{percentageChange}%
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>

            {/* Monthly Income */}
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  borderRadius: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
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
                    ₹{(monthlyIncome * 83).toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#4ADE80',
                        bgcolor: 'rgba(74, 222, 128, 0.1)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      +{incomePercentage}%
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>

            {/* Monthly Expenses */}
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  borderRadius: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
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
                    ₹{(monthlyExpenses * 83).toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#F75555',
                        bgcolor: 'rgba(247, 85, 85, 0.1)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      +{expensePercentage}%
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>

            {/* Net Savings */}
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  borderRadius: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
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
                    ₹{(netSavings * 83).toFixed(2)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: savingsPercentage >= 0 ? '#4ADE80' : '#F75555',
                        bgcolor: savingsPercentage >= 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(247, 85, 85, 0.1)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {savingsPercentage >= 0 ? '+' : ''}{savingsPercentage}%
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
                    <Button variant="outlined" size="small">View Details</Button>
                  </Box>
                  <Box sx={{ height: 'calc(100% - 40px)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData}>
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
                        <Area type="monotone" dataKey="income" stroke={theme.palette.primary.main} fillOpacity={1} fill="url(#colorIncome)" />
                        <Area type="monotone" dataKey="expenses" stroke={theme.palette.error.main} fillOpacity={1} fill="url(#colorExpenses)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>

              {/* Expense Categories */}
              <Card sx={{ flex: 2 }}>
                <CardContent sx={{ height: '100%', p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6">Expense Categories</Typography>
                    <Button variant="outlined" size="small">View Details</Button>
                  </Box>
                  <Box sx={{ height: 'calc(100% - 40px)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
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
                    <Button variant="outlined" size="small">View All</Button>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1,
                    height: 'calc(100% - 40px)',
                    overflow: 'auto'
                  }}>
                    {recentTransactions.map((transaction) => (
                      <Box
                        key={transaction.id}
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
                            bgcolor: transaction.amount > 0 ? 'success.light' : 'error.light',
                            color: transaction.amount > 0 ? 'success.dark' : 'error.dark',
                          }}
                        >
                          {transaction.category[0]}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2">{transaction.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{transaction.date}</Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color={transaction.amount > 0 ? 'success.main' : 'error.main'}
                        >
                          {transaction.amount > 0 ? '+' : ''}₹{(transaction.amount * 83).toFixed(2)}
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
                    <Button variant="outlined" size="small">Update Goal</Button>
                  </Box>
                  <Box sx={{ height: 'calc(100% - 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">Progress</Typography>
                        <Typography variant="body2" color="text.secondary">60%</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={60}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Current</Typography>
                        <Typography variant="h6">₹{(12000 * 83).toFixed(2)}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">Target</Typography>
                        <Typography variant="h6">₹{(20000 * 83).toFixed(2)}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } catch (error) {
    console.error('Error rendering Dashboard:', error);
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Error loading dashboard. Please try refreshing the page.
        </Typography>
      </Box>
    );
  }
};

export default Dashboard; 