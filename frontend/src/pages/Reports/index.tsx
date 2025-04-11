import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const ReportsPage = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('month');

  // Mock data - will be replaced with actual data from Django backend
  const stats = {
    totalIncome: 5200,
    totalExpenses: 3800,
    savings: 1400,
    topCategories: [
      { name: 'Housing', amount: 1500 },
      { name: 'Food', amount: 800 },
      { name: 'Transportation', amount: 400 },
    ],
    monthlyTrend: {
      income: [4800, 5000, 5200],
      expenses: [3500, 3600, 3800],
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Financial Reports
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="quarter">Last Quarter</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatsCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Income
              </Typography>
              <Typography variant="h4" component="div" color={theme.palette.success.main}>
                ${stats.totalIncome.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +8% from last period
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Expenses
              </Typography>
              <Typography variant="h4" component="div" color={theme.palette.error.main}>
                ${stats.totalExpenses.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +5% from last period
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Net Savings
              </Typography>
              <Typography variant="h4" component="div" color={theme.palette.primary.main}>
                ${stats.savings.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +15% from last period
              </Typography>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Top Categories */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Spending Categories
            </Typography>
            {stats.topCategories.map((category, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{category.name}</Typography>
                  <Typography>${category.amount.toLocaleString()}</Typography>
                </Box>
                <Box
                  sx={{
                    height: 8,
                    bgcolor: `${theme.palette.primary.main}20`,
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${(category.amount / stats.totalExpenses) * 100}%`,
                      bgcolor: theme.palette.primary.main,
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Trend
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">
                Chart visualization will be implemented with a charting library
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage; 