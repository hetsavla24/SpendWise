import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  useTheme,
  LinearProgress,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

interface Goal {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  status: 'ongoing' | 'completed' | 'behind';
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.MuiLinearProgress-colorPrimary`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
  },
}));

const GoalCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const categories = [
  'Emergency Fund',
  'Retirement',
  'Home Purchase',
  'Car Purchase',
  'Vacation',
  'Education',
  'Wedding',
  'Business',
  'Other',
];

const GoalsPage = () => {
  const theme = useTheme();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: '',
  });

  // This will be replaced with actual API call to Django backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        // const response = await fetch('/api/goals/');
        // const data = await response.json();
        // setGoals(data);
        
        // Temporary mock data
        setGoals([
          {
            id: 1,
            title: 'Emergency Fund',
            targetAmount: 10000,
            currentAmount: 6500,
            deadline: '2024-12-31',
            category: 'Emergency Fund',
            status: 'ongoing',
          },
          {
            id: 2,
            title: 'Down Payment for House',
            targetAmount: 50000,
            currentAmount: 15000,
            deadline: '2025-06-30',
            category: 'Home Purchase',
            status: 'behind',
          },
          {
            id: 3,
            title: 'Vacation Fund',
            targetAmount: 3000,
            currentAmount: 2800,
            deadline: '2024-08-15',
            category: 'Vacation',
            status: 'ongoing',
          },
        ] as Goal[]);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  const handleOpenDialog = (goal?: Goal) => {
    if (goal) {
      setSelectedGoal(goal);
      setFormData({
        title: goal.title,
        targetAmount: goal.targetAmount.toString(),
        currentAmount: goal.currentAmount.toString(),
        deadline: goal.deadline,
        category: goal.category,
      });
    } else {
      setSelectedGoal(null);
      setFormData({
        title: '',
        targetAmount: '',
        currentAmount: '0',
        deadline: '',
        category: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGoal(null);
  };

  const handleSubmit = async () => {
    try {
      // This will be replaced with actual API call to Django backend
      // const response = await fetch('/api/goals/', {
      //   method: selectedGoal ? 'PUT' : 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      
      const newGoal = {
        id: selectedGoal ? selectedGoal.id : Math.max(...goals.map(g => g.id)) + 1,
        title: formData.title,
        targetAmount: parseFloat(formData.targetAmount),
        currentAmount: parseFloat(formData.currentAmount),
        deadline: formData.deadline,
        category: formData.category,
        status: 'ongoing' as const,
      };

      if (selectedGoal) {
        setGoals(goals.map(g => g.id === selectedGoal.id ? newGoal : g));
      } else {
        setGoals([...goals, newGoal]);
      }
      
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // This will be replaced with actual API call to Django backend
      // await fetch(`/api/goals/₹{id}/`, {
      //   method: 'DELETE',
      // });
      
      setGoals(goals.filter(g => g.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return theme.palette.success.main;
      case 'behind':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return theme.palette.success.main;
    if (percentage >= 50) return theme.palette.primary.main;
    return theme.palette.warning.main;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Financial Goals
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Goal
        </Button>
      </Box>

      {/* Goals Grid */}
      <Grid container spacing={3}>
        {goals.map((goal) => (
          <Grid item xs={12} md={6} key={goal.id}>
            <GoalCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" color="text.primary">
                      {goal.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {goal.category}
                    </Typography>
                  </Box>
                  <Box>
                    <Chip
                      label={goal.status}
                      size="small"
                      sx={{
                        bgcolor: `₹{getStatusColor(goal.status)}20`,
                        color: getStatusColor(goal.status),
                        mr: 1,
                      }}
                    />
                    <IconButton size="small" onClick={() => handleOpenDialog(goal)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(goal.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{goal.currentAmount.toLocaleString()} of ₹{goal.targetAmount.toLocaleString()}
                    </Typography>
                  </Box>
                  <BorderLinearProgress
                    variant="determinate"
                    value={(goal.currentAmount / goal.targetAmount) * 100}
                    sx={{
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getProgressColor(goal.currentAmount, goal.targetAmount),
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Target Date
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {new Date(goal.deadline).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </GoalCard>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Goal Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedGoal ? 'Edit Goal' : 'Add New Goal'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Goal Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Target Amount"
              type="number"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              InputProps={{
                startAdornment: <Typography>₹</Typography>,
              }}
            />
            <TextField
              label="Current Amount"
              type="number"
              value={formData.currentAmount}
              onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
              InputProps={{
                startAdornment: <Typography>₹</Typography>,
              }}
            />
            <TextField
              label="Target Date"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {selectedGoal ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GoalsPage; 