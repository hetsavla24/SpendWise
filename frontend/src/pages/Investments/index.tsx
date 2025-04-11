import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

interface Investment {
  id: number;
  name: string;
  type: string;
  amount: number;
  currentValue: number;
  returnRate: number;
  lastUpdated: string;
}

const InvestmentCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const investmentTypes = [
  'Stocks',
  'Bonds',
  'Mutual Funds',
  'ETFs',
  'Real Estate',
  'Cryptocurrency',
  'Other',
];

const InvestmentsPage = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: 1,
      name: 'S&P 500 ETF',
      type: 'ETFs',
      amount: 10000,
      currentValue: 12500,
      returnRate: 25,
      lastUpdated: '2024-03-15',
    },
    {
      id: 2,
      name: 'Government Bonds',
      type: 'Bonds',
      amount: 5000,
      currentValue: 5250,
      returnRate: 5,
      lastUpdated: '2024-03-15',
    },
    {
      id: 3,
      name: 'Tech Growth Fund',
      type: 'Mutual Funds',
      amount: 7500,
      currentValue: 8250,
      returnRate: 10,
      lastUpdated: '2024-03-15',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    amount: '',
  });

  const handleOpenDialog = (investment?: Investment) => {
    if (investment) {
      setSelectedInvestment(investment);
      setFormData({
        name: investment.name,
        type: investment.type,
        amount: investment.amount.toString(),
      });
    } else {
      setSelectedInvestment(null);
      setFormData({
        name: '',
        type: '',
        amount: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInvestment(null);
  };

  const handleSubmit = () => {
    const newInvestment = {
      id: selectedInvestment ? selectedInvestment.id : Math.max(...investments.map(i => i.id)) + 1,
      name: formData.name,
      type: formData.type,
      amount: parseFloat(formData.amount),
      currentValue: parseFloat(formData.amount), // Initially same as amount
      returnRate: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    if (selectedInvestment) {
      setInvestments(investments.map(i => i.id === selectedInvestment.id ? newInvestment : i));
    } else {
      setInvestments([...investments, newInvestment]);
    }

    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setInvestments(investments.filter(i => i.id !== id));
  };

  const getTotalInvestment = () => {
    return investments.reduce((sum, inv) => sum + inv.amount, 0);
  };

  const getCurrentValue = () => {
    return investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  };

  const getTotalReturn = () => {
    const totalValue = getCurrentValue();
    const totalInvestment = getTotalInvestment();
    return ((totalValue - totalInvestment) / totalInvestment) * 100;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Investment Portfolio
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Investment
        </Button>
      </Box>

      {/* Portfolio Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <InvestmentCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Investment
              </Typography>
              <Typography variant="h4" component="div" color="text.primary">
                ${getTotalInvestment().toLocaleString()}
              </Typography>
            </CardContent>
          </InvestmentCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <InvestmentCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Current Value
              </Typography>
              <Typography variant="h4" component="div" color={theme.palette.primary.main}>
                ${getCurrentValue().toLocaleString()}
              </Typography>
            </CardContent>
          </InvestmentCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <InvestmentCard>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Return
              </Typography>
              <Typography
                variant="h4"
                component="div"
                color={getTotalReturn() >= 0 ? theme.palette.success.main : theme.palette.error.main}
              >
                {getTotalReturn().toFixed(2)}%
              </Typography>
            </CardContent>
          </InvestmentCard>
        </Grid>
      </Grid>

      {/* Investments List */}
      <Grid container spacing={3}>
        {investments.map((investment) => (
          <Grid item xs={12} md={6} key={investment.id}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h6" color="text.primary">
                    {investment.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {investment.type}
                  </Typography>
                </Box>
                <Box>
                  <IconButton size="small" onClick={() => handleOpenDialog(investment)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(investment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Invested Amount
                  </Typography>
                  <Typography variant="body1">
                    ${investment.amount.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Current Value
                  </Typography>
                  <Typography variant="body1">
                    ${investment.currentValue.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Return Rate
                  </Typography>
                  <Typography
                    variant="body1"
                    color={investment.returnRate >= 0 ? theme.palette.success.main : theme.palette.error.main}
                  >
                    {investment.returnRate}%
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1">
                    {new Date(investment.lastUpdated).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Investment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedInvestment ? 'Edit Investment' : 'Add New Investment'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Investment Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              select
              label="Investment Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              {investmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Investment Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              InputProps={{
                startAdornment: <Typography>$</Typography>,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {selectedInvestment ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvestmentsPage; 