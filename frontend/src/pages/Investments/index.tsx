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
  LinearProgress,
  InputAdornment,
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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        background: 'linear-gradient(135deg, rgba(71, 118, 230, 0.1) 0%, rgba(142, 84, 233, 0.1) 100%)',
        borderRadius: '16px',
        p: 3,
      }}>
        <Typography variant="h4" fontWeight="bold" sx={{
          background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}>
          Investments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px -6px rgba(142, 84, 233, 0.4)',
            }
          }}
        >
          Add Investment
        </Button>
      </Box>

      {/* Investment Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(71, 118, 230, 0.05) 0%, rgba(142, 84, 233, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'transform 0.2s',
            height: '100%',
            '&:hover': {
              transform: 'translateY(-4px)',
            }
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Total Portfolio Value
              </Typography>
              <Typography variant="h3" gutterBottom sx={{
                background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 'bold'
              }}>
                ${getCurrentValue().toLocaleString()}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Box sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    flex: '1 1 auto',
                    minWidth: '120px',
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Total Return
                    </Typography>
                    <Typography variant="h6" sx={{
                      color: getTotalReturn() >= 0 ? '#00C853' : '#FF1744',
                      fontWeight: 'bold'
                    }}>
                      {getTotalReturn() >= 0 ? '+' : ''}{getTotalReturn().toLocaleString()}%
                    </Typography>
                  </Box>
                  <Box sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    flex: '1 1 auto',
                    minWidth: '120px',
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Total Investments
                    </Typography>
                    <Typography variant="h6" sx={{
                      background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 'bold'
                    }}>
                      {investments.length}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{
            background: 'linear-gradient(135deg, rgba(71, 118, 230, 0.05) 0%, rgba(142, 84, 233, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'transform 0.2s',
            height: '100%',
            '&:hover': {
              transform: 'translateY(-4px)',
            }
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                Portfolio Distribution
              </Typography>
              {/* Add your pie chart or distribution visualization here */}
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Portfolio distribution chart will be displayed here
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Investment List */}
      <Typography variant="h6" sx={{ 
        mb: 2,
        background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        fontWeight: 'bold'
      }}>
        Your Investments
      </Typography>
      <Grid container spacing={3}>
        {investments.map((investment) => (
          <Grid item xs={12} md={6} lg={4} key={investment.id}>
            <Card sx={{
              background: 'linear-gradient(135deg, rgba(71, 118, 230, 0.05) 0%, rgba(142, 84, 233, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 20px -6px rgba(142, 84, 233, 0.2)',
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}>
                      {investment.name}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      ${investment.amount.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpenDialog(investment)}
                      sx={{
                        background: 'rgba(71, 118, 230, 0.1)',
                        mr: 1,
                        '&:hover': {
                          background: 'rgba(71, 118, 230, 0.2)',
                        }
                      }}
                    >
                      <EditIcon sx={{ color: '#4776E6' }} />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      sx={{
                        background: 'rgba(244, 67, 54, 0.1)',
                        '&:hover': {
                          background: 'rgba(244, 67, 54, 0.2)',
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Type: {investment.type}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Last Updated: {new Date(investment.lastUpdated).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: investment.returnRate >= 0 ? '#00C853' : '#FF1744',
                    fontWeight: 500
                  }}>
                    Return: {investment.returnRate >= 0 ? '+' : ''}{investment.returnRate}%
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Performance
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(Math.max((investment.returnRate + 100) / 2, 0), 100)}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'rgba(142, 84, 233, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: investment.returnRate >= 0
                          ? 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)'
                          : 'linear-gradient(135deg, #FF5252 0%, #FF1744 100%)',
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Investment Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, rgba(71, 118, 230, 0.05) 0%, rgba(142, 84, 233, 0.05) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{
          background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold'
        }}>
          {selectedInvestment ? 'Edit Investment' : 'Add Investment'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Investment Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4776E6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8E54E9',
                  },
                },
              }}
            />
            <TextField
              label="Investment Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              InputProps={{
                startAdornment: <Typography>$</Typography>,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4776E6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8E54E9',
                  },
                },
              }}
            />
            <TextField
              label="Investment Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              select
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#4776E6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8E54E9',
                  },
                },
              }}
            >
              {investmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                background: 'rgba(142, 84, 233, 0.1)',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{
              background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(142, 84, 233, 0.3)',
              }
            }}
          >
            {selectedInvestment ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvestmentsPage; 