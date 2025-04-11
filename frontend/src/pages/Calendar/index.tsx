import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Badge,
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface Event {
  id: number;
  title: string;
  date: Date;
  type: 'expense' | 'income' | 'reminder';
  amount?: number;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Salary Credit',
      date: new Date(2024, new Date().getMonth(), 5),
      type: 'income',
      amount: 5000,
    },
    {
      id: 2,
      title: 'Rent Payment',
      date: new Date(2024, new Date().getMonth(), 10),
      type: 'expense',
      amount: 1200,
    },
    {
      id: 3,
      title: 'Budget Review',
      date: new Date(2024, new Date().getMonth(), 15),
      type: 'reminder',
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'reminder' as 'expense' | 'income' | 'reminder',
    amount: '',
  });

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const handleAddEvent = () => {
    const newEventData: Event = {
      id: events.length + 1,
      title: newEvent.title,
      date: currentDate,
      type: newEvent.type,
      ...(newEvent.type !== 'reminder' && { amount: parseFloat(newEvent.amount) }),
    };
    setEvents([...events, newEventData]);
    setNewEvent({ title: '', type: 'reminder', amount: '' });
    setOpenDialog(false);
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Render days of week
    daysOfWeek.forEach((day) => {
      days.push(
        <Box 
          key={`header-${day}`}
          sx={{ 
            flex: 1,
            textAlign: 'center',
            p: 1,
          }}
        >
          <Typography sx={{ fontWeight: 600, color: 'text.secondary', mb: 2 }}>
            {day}
          </Typography>
        </Box>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <Box 
          key={`empty-${i}`}
          sx={{ flex: 1 }}
        >
          <Paper
            sx={{
              p: 2,
              minHeight: 100,
              bgcolor: 'background.default',
              opacity: 0.5,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
        </Box>
      );
    }

    // Render actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <Box 
          key={day}
          sx={{ flex: 1 }}
        >
          <Paper
            sx={{
              p: 2,
              minHeight: 100,
              cursor: 'pointer',
              bgcolor: isToday ? 'primary.main' : 'background.paper',
              color: isToday ? 'white' : 'inherit',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: isToday ? 'primary.dark' : 'action.hover',
                transform: 'scale(1.02)',
                boxShadow: 1,
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontWeight: isToday ? 'bold' : 'normal' }}>
                {day}
              </Typography>
              {dayEvents.length > 0 && (
                <Badge
                  badgeContent={dayEvents.length}
                  color="secondary"
                  sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {dayEvents.map((event) => (
                <Tooltip key={event.id} title={`${event.title}${event.amount ? ` - $${event.amount}` : ''}`}>
                  <Typography
                    noWrap
                    variant="caption"
                    sx={{
                      color: event.type === 'income' ? 'success.main' :
                             event.type === 'expense' ? 'error.main' :
                             'info.main',
                      bgcolor: event.type === 'income' ? 'success.lighter' :
                              event.type === 'expense' ? 'error.lighter' :
                              'info.lighter',
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      fontSize: '0.7rem',
                    }}
                  >
                    {event.title}
                  </Typography>
                </Tooltip>
              ))}
            </Box>
          </Paper>
        </Box>
      );
    }

    return days;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Header */}
      <Box
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Financial Calendar
        </Typography>
        <Typography>
          Track your financial events and reminders
        </Typography>
      </Box>

      <Card sx={{ mb: 3, position: 'relative' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={handlePreviousMonth}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'medium' }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Typography>
            <IconButton onClick={handleNextMonth}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              '& > *': {
                minWidth: 'calc(14.28% - 16px)', // 7 columns with gap
                flexBasis: 'calc(14.28% - 16px)',
              },
            }}
          >
            {renderCalendarDays()}
          </Box>
        </CardContent>
        <Fab
          color="primary"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
          onClick={() => setOpenDialog(true)}
        >
          <AddIcon />
        </Fab>
      </Card>

      {/* Add Event Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              fullWidth
            />
            <TextField
              select
              label="Event Type"
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
              fullWidth
            >
              <MenuItem value="reminder">Reminder</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>
            {newEvent.type !== 'reminder' && (
              <TextField
                label="Amount"
                type="number"
                value={newEvent.amount}
                onChange={(e) => setNewEvent({ ...newEvent, amount: e.target.value })}
                fullWidth
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEvent} variant="contained" disabled={!newEvent.title}>
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar; 