import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { useCurrency } from '../contexts/CurrencyContext';

interface AmountDisplayProps extends Omit<TypographyProps, 'children'> {
  amount: number;
  showSign?: boolean;
  colored?: boolean;
}

const AmountDisplay: React.FC<AmountDisplayProps> = ({
  amount,
  showSign = false,
  colored = true,
  ...props
}) => {
  const { formatAmount } = useCurrency();

  const getColor = () => {
    if (!colored) return undefined;
    if (amount > 0) return 'success.main';
    if (amount < 0) return 'error.main';
    return undefined;
  };

  const formattedAmount = formatAmount(Math.abs(amount));
  const displayAmount = showSign && amount > 0 ? `+${formattedAmount}` : formattedAmount;

  return (
    <Typography {...props} color={getColor()}>
      {displayAmount}
    </Typography>
  );
};

export default AmountDisplay; 