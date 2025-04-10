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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Budget
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Category
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {/* Overall Budget Summary */}
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Budget
                </Typography>
                <Typography variant="h3" color="primary.main" gutterBottom>
                  ${totalBudget.toLocaleString()}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Spent: ${totalSpent.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Remaining: ${(totalBudget - totalSpent).toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(totalSpent / totalBudget) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: theme.palette.grey[200],
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getProgressColor(totalSpent, totalBudget),
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Monthly Overview
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Categories
                    </Typography>
                    <Typography variant="h6">
                      {categories.length}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Average Spent
                    </Typography>
                    <Typography variant="h6">
                      ${(totalSpent / categories.length).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Budget Health
                    </Typography>
                    <Chip
                      label={totalSpent <= totalBudget ? 'On Track' : 'Over Budget'}
                      color={totalSpent <= totalBudget ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* Budget Categories */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Budget Categories
        </Typography>
        <Stack spacing={3}>
          {categories.map((category) => (
            <Box key={category.id} sx={{ width: '100%' }}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {category.name}
                    </Typography>
                    <Typography variant="h6" color={category.color}>
                      ${category.spent.toLocaleString()} / ${category.budget.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleOpenDialog(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(category.spent / category.budget) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: `${category.color}20`,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: category.color,
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {((category.spent / category.budget) * 100).toFixed(1)}% spent
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${(category.budget - category.spent).toLocaleString()} remaining
                    </Typography>
                  </Box>
                  {category.spent >= category.budget * 0.9 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <WarningIcon color="warning" fontSize="small" />
                      <Typography variant="body2" color="warning.main">
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedCategory ? 'Edit Category' : 'Add Category'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Category Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Budget Amount"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedCategory ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BudgetPage; 