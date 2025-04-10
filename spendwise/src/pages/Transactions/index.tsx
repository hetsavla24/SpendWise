import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

const categories = [
  'Salary',
  'Food & Dining',
  'Shopping',
  'Transport',
  'Bills & Utilities',
  'Entertainment',
  'Healthcare',
  'Other',
];

const TransactionsPage = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionForm, setTransactionForm] = useState({
    date: new Date(),
    description: '',
    category: '',
    type: 'expense' as 'income' | 'expense',
    amount: '',
  });

  // Mock data with correct type annotations
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      date: '2024-03-15',
      description: 'Monthly Salary',
      category: 'Salary',
      type: 'income',
      amount: 5000,
    },
    {
      id: 2,
      date: '2024-03-14',
      description: 'Grocery Shopping',
      category: 'Food & Dining',
      type: 'expense',
      amount: 156.85,
    },
    {
      id: 3,
      date: '2024-03-14',
      description: 'Netflix Subscription',
      category: 'Entertainment',
      type: 'expense',
      amount: 14.99,
    },
    {
      id: 4,
      date: '2024-03-13',
      description: 'Electric Bill',
      category: 'Bills & Utilities',
      type: 'expense',
      amount: 85.50,
    },
  ] as Transaction[]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setFilterAnchorEl(null);
  };

  const handleOpenDialog = (transaction?: Transaction) => {
    if (transaction) {
      setSelectedTransaction(transaction);
      setTransactionForm({
        date: new Date(transaction.date),
        description: transaction.description,
        category: transaction.category,
        type: transaction.type,
        amount: transaction.amount.toString(),
      });
    } else {
      setSelectedTransaction(null);
      setTransactionForm({
        date: new Date(),
        description: '',
        category: '',
        type: 'expense' as 'income' | 'expense',
        amount: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTransaction(null);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || transaction.category === selectedCategory;
    const matchesType = !selectedType || transaction.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Transactions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Transaction
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleOpenFilter}
          >
            Filter
          </Button>
        </Box>
      </Paper>

      {/* Transactions Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Chip label={transaction.category} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type}
                      size="small"
                      color={transaction.type === 'income' ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                    >
                      {transaction.type === 'income' ? '+' : '-'}$
                      {transaction.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(transaction)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleCloseFilter}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={selectedType}
              label="Type"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Menu>

      {/* Add/Edit Transaction Dialog */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <DatePicker
                label="Date"
                value={transactionForm.date}
                onChange={(newValue: Date | null) => 
                  setTransactionForm({ ...transactionForm, date: newValue || new Date() })
                }
              />
              <TextField
                label="Description"
                value={transactionForm.description}
                onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={transactionForm.category}
                  label="Category"
                  onChange={(e) => setTransactionForm({ ...transactionForm, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={transactionForm.type}
                  label="Type"
                  onChange={(e) => setTransactionForm({ ...transactionForm, type: e.target.value as 'income' | 'expense' })}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Amount"
                type="number"
                value={transactionForm.amount}
                onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleCloseDialog}>
              {selectedTransaction ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Box>
  );
};

export default TransactionsPage; 