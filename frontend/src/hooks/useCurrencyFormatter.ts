import { useMemo } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatCurrency } from '../utils/formatters';

export const useCurrencyFormatter = () => {
  const { currency } = useCurrency();
  const { language } = useLanguage();

  const format = useMemo(() => {
    return (amount: number) => formatCurrency(amount, currency, language);
  }, [currency, language]);

  return format;
}; 