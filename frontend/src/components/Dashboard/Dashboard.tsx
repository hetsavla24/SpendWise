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
  Button,
  TextField,
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
import { useCurrencyFormatter } from '../../hooks/useCurrencyFormatter';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, subMonths } from 'date-fns';

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
  const formatCurrency = useCurrencyFormatter();
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date(2022, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Load voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;

    // Function to initialize voices
    const initializeVoices = () => {
      // Chrome needs a little kick to load voices
      synth.getVoices();

      // Wait a bit and then try to load voices
      setTimeout(() => {
        const availableVoices = synth.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          console.log('Voices loaded:', availableVoices.length);
        }
      }, 100);
    };

    // Try to load voices immediately
    initializeVoices();

    // Also set up the event listener for voice changes
    synth.addEventListener('voiceschanged', initializeVoices);

    return () => {
      synth.removeEventListener('voiceschanged', initializeVoices);
    };
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8000/api/dashboard/analytics/?start_date=${format(startDate, 'yyyy-MM-dd')}&end_date=${format(endDate, 'yyyy-MM-dd')}`
        );
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [startDate, endDate]);

  if (loading || !dashboardData) {
    return <Box sx={{ p: 3 }}><LinearProgress /></Box>;
  }

  // Calculate percentage changes
  const calculatePercentageChange = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
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

  const speakText = async (text: string) => {
    return new Promise<void>((resolve, reject) => {
      const synth = window.speechSynthesis;
      
      // Cancel any ongoing speech and set speaking state to false initially
      stopSpeaking();

      // Set speaking state to true before starting
      setIsSpeaking(true);

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure speech settings
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to find an English voice
      const availableVoices = synth.getVoices();
      const englishVoice = availableVoices.find(voice => 
        voice.lang.startsWith('en-US') || voice.lang.startsWith('en-GB')
      );

      if (englishVoice) {
        utterance.voice = englishVoice;
        utterance.lang = englishVoice.lang;
      } else {
        utterance.lang = 'en-US';
      }

      // Set up event handlers
      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        setIsSpeaking(false);
        reject(event);
      };

      // Chrome sometimes stops speaking if the text is too long
      // Split into smaller chunks if needed
      const chunks = text.match(/[^.!?]+[.!?]+/g) || [text];
      
      let currentChunk = 0;
      const speakNextChunk = () => {
        if (currentChunk < chunks.length) {
          const chunkUtterance = new SpeechSynthesisUtterance(chunks[currentChunk]);
          chunkUtterance.onend = () => {
            currentChunk++;
            speakNextChunk();
          };
          chunkUtterance.voice = utterance.voice;
          chunkUtterance.lang = utterance.lang;
          chunkUtterance.onstart = () => setIsSpeaking(true);
          chunkUtterance.onerror = (event) => {
            console.error('Chunk speech error:', event);
            setIsSpeaking(false);
          };
          synth.speak(chunkUtterance);
        } else {
          setIsSpeaking(false);
          resolve();
        }
      };

      speakNextChunk();
    });
  };

  const stopSpeaking = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsSpeaking(false);
  };

  const handleVoiceAssistant = async () => {
    try {
      const synth = window.speechSynthesis;

      if (!synth) {
        alert('Speech synthesis is not supported in your browser. Please try using Chrome.');
        return;
      }

      // If already speaking, stop
      if (isSpeaking) {
        stopSpeaking();
        return;
      }

      // Set speaking state to true before starting
      setIsSpeaking(true);

      // Welcome and summary
      const summaryText = `
        Welcome to your SpendWise dashboard.
        Your current balance is ${formatCurrency(dashboardData.summary.current_balance)}.
        This month, you earned ${formatCurrency(dashboardData.summary.total_credit)}
        and spent ${formatCurrency(dashboardData.summary.total_debit)}.
      `.trim();

      await speakText(summaryText);

      // Recent transactions
      const transactionsText = `
        Here are your 5 most recent transactions:
        ${dashboardData.recent_transactions.slice(0, 5).map(transaction => {
          const type = transaction.debit > 0 ? 'spent' : 'received';
          const amount = transaction.debit || transaction.credit;
          const date = new Date(transaction.transaction_date).toLocaleDateString();
          return `On ${date}, you ${type} ${formatCurrency(amount)} with ${transaction.recipient_name}.`;
        }).join(' ')}
      `.trim();

      await speakText(transactionsText);

      // Savings goal
      const savingsText = `
        Regarding your savings goal, you have saved ${formatCurrency(dashboardData.savings_goal.current)}
        out of your target of ${formatCurrency(dashboardData.savings_goal.target)},
        which is ${dashboardData.savings_goal.progress.toFixed(1)} percent complete.
      `.trim();

      await speakText(savingsText);

    } catch (error) {
      console.error('Voice assistant error:', error);
      setIsSpeaking(false);
      alert('Unable to use speech synthesis. Please check your browser settings and ensure audio is enabled.');
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      height: 'calc(100vh - 64px)', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
    }}>
      {/* Date Range Selector */}
      <Card sx={{ 
        p: 2,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
        boxShadow: '0 8px 32px rgba(77, 101, 217, 0.1)',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.8)',
      }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => newValue && setStartDate(newValue)}
              slotProps={{
                textField: {
                  variant: "outlined",
                  size: "small",
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }
                }
              }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => newValue && setEndDate(newValue)}
              minDate={startDate}
              slotProps={{
                textField: {
                  variant: "outlined",
                  size: "small",
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }
                }
              }}
            />
          </LocalizationProvider>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              background: 'rgba(71, 118, 230, 0.1)',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontWeight: 500,
            }}
          >
            Showing data from {format(startDate, 'MMM d, yyyy')} to {format(endDate, 'MMM d, yyyy')}
          </Typography>
        </Stack>
      </Card>

      {/* Voice Assistant Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleVoiceAssistant}
          startIcon={<Typography component="span">{isSpeaking ? "🔇" : "🔊"}</Typography>}
          sx={{
            background: isSpeaking 
              ? 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)'
              : 'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)',
            color: 'white',
            '&:hover': {
              background: isSpeaking
                ? 'linear-gradient(135deg, #FF4B2B 0%, #FF416C 100%)'
                : 'linear-gradient(135deg, #E100FF 0%, #7F00FF 100%)',
            },
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1,
            minWidth: '150px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
        >
          {isSpeaking ? 'Stop Reading' : 'Start Reading'}
        </Button>
      </Box>

      {/* Financial Summary Cards */}
      <Grid container spacing={3}>
        {/* Total Balance */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            height: '100%',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
            boxShadow: '0 8px 32px rgba(77, 101, 217, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.8)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(77, 101, 217, 0.12)',
            }
          }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ 
                color: 'text.secondary',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}>
                {t('total_balance')}
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {formatCurrency(dashboardData.summary.current_balance)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ 
                  color: '#4ADE80',
                  bgcolor: 'rgba(74, 222, 128, 0.1)',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 600,
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
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fff9 100%)',
            boxShadow: '0 8px 32px rgba(74, 222, 128, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.8)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(74, 222, 128, 0.12)',
            }
          }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ 
                color: 'text.secondary',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}>
                {t('monthly_income')}
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
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 600,
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
            background: 'linear-gradient(135deg, #ffffff 0%, #fff8f8 100%)',
            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.8)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(255, 107, 107, 0.12)',
            }
          }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ 
                color: 'text.secondary',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}>
                {t('monthly_expenses')}
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
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 600,
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
            background: 'linear-gradient(135deg, #ffffff 0%, #f8ffff 100%)',
            boxShadow: '0 8px 32px rgba(0, 201, 255, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.8)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': { 
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 40px rgba(0, 201, 255, 0.12)',
            }
          }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ 
                color: 'text.secondary',
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}>
                {t('net_savings')}
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {formatCurrency(dashboardData.summary.total_credit - dashboardData.summary.total_debit)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ 
                  color: '#4ADE80',
                  bgcolor: 'rgba(74, 222, 128, 0.1)',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 600,
                }}>
                  +2.1%
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
          <Card sx={{ 
            flex: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
            boxShadow: '0 8px 32px rgba(77, 101, 217, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}>
            <CardContent sx={{ height: '100%', p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Income vs Expenses
                </Typography>
              </Box>
              <Box sx={{ height: 'calc(100% - 40px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.monthly_analysis}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4776E6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4776E6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF416C" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#FF416C" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total_credit" 
                      name="Income"
                      stroke="#4776E6" 
                      fillOpacity={1} 
                      fill="url(#colorIncome)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total_debit" 
                      name="Expenses"
                      stroke="#FF416C" 
                      fillOpacity={1} 
                      fill="url(#colorExpenses)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Category Analysis */}
          <Card sx={{ 
            flex: 2,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
            boxShadow: '0 8px 32px rgba(77, 101, 217, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}>
            <CardContent sx={{ height: '100%', p: 3 }}>
              <Typography variant="h6" sx={{ 
                mb: 2,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
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
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Side - Transactions and Goals */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Recent Transactions */}
          <Card sx={{ 
            flex: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
            boxShadow: '0 8px 32px rgba(77, 101, 217, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}>
            <CardContent sx={{ height: '100%', p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Recent Transactions
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1,
                height: 'calc(100% - 40px)',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0,0,0,0.05)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                  '&:hover': {
                    background: 'rgba(0,0,0,0.2)',
                  },
                },
              }}>
                {dashboardData.recent_transactions.map((transaction, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.8)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'transform 0.2s',
                      '&:hover': { 
                        transform: 'translateX(4px)',
                        background: 'rgba(255,255,255,0.9)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        background: transaction.debit > 0 
                          ? 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)'
                          : 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      {transaction.debit > 0 ? '🛒' : '💰'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {transaction.recipient_name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {new Date(transaction.transaction_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: transaction.debit > 0 ? '#FF416C' : '#4ADE80',
                        fontWeight: 'bold',
                        background: transaction.debit > 0 
                          ? 'rgba(255, 65, 108, 0.1)'
                          : 'rgba(74, 222, 128, 0.1)',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
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
          <Card sx={{ 
            flex: 2,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
            boxShadow: '0 8px 32px rgba(77, 101, 217, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}>
            <CardContent sx={{ height: '100%', p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Savings Goal
                </Typography>
              </Box>
              <Box sx={{ height: 'calc(100% - 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary',
                      fontWeight: 600,
                    }}>
                      Progress
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#4776E6',
                      fontWeight: 600,
                    }}>
                      {dashboardData.savings_goal.progress.toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={dashboardData.savings_goal.progress}
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      backgroundColor: 'rgba(71, 118, 230, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
                        borderRadius: 5,
                      },
                    }}
                  />
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  background: 'rgba(71, 118, 230, 0.05)',
                  borderRadius: 3,
                  p: 2,
                }}>
                  <Box>
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary',
                      fontWeight: 600,
                      mb: 0.5,
                    }}>
                      Current
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700,
                      color: '#4776E6',
                    }}>
                      {formatCurrency(dashboardData.savings_goal.current)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary',
                      fontWeight: 600,
                      mb: 0.5,
                    }}>
                      Target
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700,
                      color: '#8E54E9',
                    }}>
                      {formatCurrency(dashboardData.savings_goal.target)}
                    </Typography>
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