import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  useTheme,
  Chip,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';

interface BudgetCategory {
  id: number;
  name: string;
  budget: number;
  spent: number;
  color: string;
}

const BudgetPage = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
  });

  // Mock data
  const [categories] = useState<BudgetCategory[]>([
    {
      id: 1,
      name: 'Food & Dining',
      budget: 1000,
      spent: 850.25,
      color: theme.palette.warning.main,
    },
    {
      id: 2,
      name: 'Shopping',
      budget: 2000,
      spent: 1250.80,
      color: theme.palette.error.main,
    },
    {
      id: 3,
      name: 'Transport',
      budget: 500,
      spent: 320.45,
      color: theme.palette.info.main,
    },
    {
      id: 4,
      name: 'Bills & Utilities',
      budget: 1500,
      spent: 1450.75,
      color: theme.palette.primary.main,
    },
    {
      id: 5,
      name: 'Entertainment',
      budget: 300,
      spent: 275.50,
      color: theme.palette.success.main,
    },
  ]);

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);

  const handleOpenDialog = (category?: BudgetCategory) => {
    if (category) {
      setSelectedCategory(category);
      setFormData({
        name: category.name,
        budget: category.budget.toString(),
      });
    } else {
      setSelectedCategory(null);
      setFormData({
        name: '',
        budget: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return theme.palette.error.main;
    if (percentage >= 75) return theme.palette.warning.main;
    return theme.palette.success.main;
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
          Budget
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
          Add Category
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {/* Overall Budget Summary */}
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Card sx={{
              background: 'linear-gradient(135deg, rgba(71, 118, 230, 0.05) 0%, rgba(142, 84, 233, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                  Total Budget
                </Typography>
                <Typography variant="h3" gutterBottom sx={{
                  background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 'bold'
                }}>
                  ₹{totalBudget.toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{
                      color: 'text.secondary',
                      fontWeight: 500
                    }}>
                      Spent: ₹{totalSpent.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{
                      color: 'text.secondary',
                      fontWeight: 500
                    }}>
                      Remaining: ₹{(totalBudget - totalSpent).toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(totalSpent / totalBudget) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'rgba(142, 84, 233, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Card sx={{
              background: 'linear-gradient(135deg, rgba(71, 118, 230, 0.05) 0%, rgba(142, 84, 233, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                  Monthly Overview
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 3, 
                  flexWrap: 'wrap',
                  '& > div': {
                    flex: '1 1 auto',
                    minWidth: '120px',
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }
                }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Categories
                    </Typography>
                    <Typography variant="h6" sx={{
                      background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 'bold'
                    }}>
                      {categories.length}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Average Spent
                    </Typography>
                    <Typography variant="h6" sx={{
                      background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 'bold'
                    }}>
                      ₹{(totalSpent / categories.length).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      Budget Health
                    </Typography>
                    <Chip
                      label={totalSpent <= totalBudget ? 'On Track' : 'Over Budget'}
                      sx={{
                        background: totalSpent <= totalBudget 
                          ? 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)'
                          : 'linear-gradient(135deg, #FF5252 0%, #FF1744 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        '& .MuiChip-label': {
                          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* Budget Categories */}
        <Typography variant="h6" sx={{ 
          mb: 2,
          background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold'
        }}>
          Budget Categories
        </Typography>
        <Stack spacing={3}>
          {categories.map((category) => (
            <Box key={category.id} sx={{ width: '100%' }}>
              <Paper sx={{ 
                p: 3,
                background: 'linear-gradient(135deg, rgba(71, 118, 230, 0.05) 0%, rgba(142, 84, 233, 0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px -6px rgba(142, 84, 233, 0.2)',
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}>
                      {category.name}
                    </Typography>
                    <Typography variant="h6" sx={{
                      fontWeight: 'bold',
                      color: category.color,
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>
                      ₹{category.spent.toLocaleString()} / ₹{category.budget.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpenDialog(category)}
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
                <Box sx={{ mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(category.spent / category.budget) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: `₹{category.color}20`,
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(135deg, ₹{category.color} 0%, ₹{category.color}CC 100%)`,
                        borderRadius: 5,
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500
                    }}>
                      {((category.spent / category.budget) * 100).toFixed(1)}% spent
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary',
                      fontWeight: 500
                    }}>
                      ₹{(category.budget - category.spent).toLocaleString()} remaining
                    </Typography>
                  </Box>
                  {category.spent >= category.budget * 0.9 && (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1, 
                      mt: 1,
                      p: 1,
                      borderRadius: 1,
                      background: 'rgba(255, 152, 0, 0.1)',
                    }}>
                      <WarningIcon sx={{ color: theme.palette.warning.main }} fontSize="small" />
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.warning.main,
                        fontWeight: 500
                      }}>
                        Near budget limit
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Add/Edit Category Dialog */}
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
          {selectedCategory ? 'Edit Category' : 'Add Category'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Category Name"
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
              label="Budget Amount"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
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
            onClick={handleCloseDialog}
            sx={{
              background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(142, 84, 233, 0.3)',
              }
            }}
          >
            {selectedCategory ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BudgetPage; 